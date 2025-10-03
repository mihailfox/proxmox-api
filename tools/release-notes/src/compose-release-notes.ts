import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

export interface ComposeReleaseNotesOptions {
  workspace: string;
  items?: string[];
  changedFiles?: string[];
  outputPath?: string;
}

export interface ReleaseNoteEntry {
  id: string;
  filePath: string;
  title: string;
  summary: string;
}

const CHANGELOG_PREFIX = 'versions/CHANGELOG-';

export function parseReleaseItems(raw: string | undefined | null): string[] {
  if (!raw) {
    return [];
  }
  return raw
    .split(/[;,]/)
    .map((value) => value.trim().toUpperCase())
    .filter((value, index, all) => value.length > 0 && all.indexOf(value) === index);
}

export function isChangelogFilePath(filePath: string): boolean {
  const normalized = filePath.replace(/\\/g, '/');
  return normalized.startsWith(CHANGELOG_PREFIX) && normalized.endsWith('.md');
}

function readWorkspaceFile(workspace: string, relativePath: string): string {
  const absolutePath = resolve(workspace, relativePath);
  return readFileSync(absolutePath, 'utf8');
}

function ensureOutputDirectory(path: string): void {
  const directory = dirname(path);
  if (!existsSync(directory)) {
    mkdirSync(directory, { recursive: true });
  }
}

function parseTitle(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  for (const line of lines) {
    if (line.trimStart().startsWith('# ')) {
      return line.trimStart().replace(/^#\s*/, '').trim();
    }
  }
  throw new Error('Unable to find top-level title in changelog entry.');
}

function parseSummary(markdown: string): string {
  const summaryMatch = markdown.match(/(^|\n)##\s+Summary\s*\n([\s\S]*?)(\n##\s+|\n#\s+|$)/);
  if (!summaryMatch) {
    throw new Error('Unable to locate "## Summary" section in changelog entry.');
  }
  const summaryContent = summaryMatch[2]
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+$/u, ''))
    .join('\n')
    .trim();
  if (summaryContent.length === 0) {
    throw new Error('Changelog summary section is empty.');
  }
  return summaryContent;
}

function candidateScore(fileName: string): [number, number] {
  const lower = fileName.toLowerCase();
  if (lower.includes('-pr-')) {
    const match = lower.match(/-pr-(\d+)/);
    return [0, match ? Number.parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER];
  }
  if (/-[0-9a-f]{7,}/iu.test(lower)) {
    return [1, Number.MAX_SAFE_INTEGER];
  }
  if (lower.includes('-plan-')) {
    const match = lower.match(/-plan-(\d+)/);
    return [2, match ? Number.parseInt(match[1], 10) : -1];
  }
  return [3, -1];
}

function selectLatestFileForId(workspace: string, id: string): string {
  const versionsDir = resolve(workspace, 'versions');
  const prefix = `CHANGELOG-${id}-`;
  const entries = readdirSync(versionsDir).filter((entry) => entry.startsWith(prefix) && entry.endsWith('.md'));
  if (entries.length === 0) {
    throw new Error(`Unable to find changelog entry for ${id}.`);
  }
  const sorted = [...entries].sort((a, b) => {
    const [scoreA, seqA] = candidateScore(a);
    const [scoreB, seqB] = candidateScore(b);
    if (scoreA !== scoreB) {
      return scoreA - scoreB;
    }
    if (seqA !== seqB) {
      return seqB - seqA;
    }
    return a.localeCompare(b);
  });
  return join('versions', sorted[0]);
}

function normalizeChangedFiles(changedFiles: string[] | undefined): string[] {
  if (!changedFiles) {
    return [];
  }
  return changedFiles
    .map((filePath) => filePath.replace(/\\/g, '/'))
    .filter((filePath) => isChangelogFilePath(filePath));
}

function unique<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

export function collectEntries(options: ComposeReleaseNotesOptions): ReleaseNoteEntry[] {
  const { workspace, items, changedFiles } = options;
  const normalizedItems = items ?? [];
  const normalizedChangedFiles = normalizeChangedFiles(changedFiles);

  let targetFiles: string[] = [];

  if (normalizedItems.length > 0) {
    targetFiles = normalizedItems.map((id) => selectLatestFileForId(workspace, id));
  } else if (normalizedChangedFiles.length > 0) {
    targetFiles = [...normalizedChangedFiles].sort();
  } else {
    throw new Error('No release items provided and no changelog changes detected.');
  }

  const uniqueFiles = unique(targetFiles);
  if (uniqueFiles.length === 0) {
    throw new Error('No changelog entries available to compose release notes.');
  }

  return uniqueFiles.map((relativePath) => {
    const markdown = readWorkspaceFile(workspace, relativePath);
    const title = parseTitle(markdown);
    const summary = parseSummary(markdown);
    const idMatch = title.match(/^(TASK|ISSUE)-\d+/i);
    const entryId = idMatch ? idMatch[0].toUpperCase() : relativePath.replace(/^versions\/CHANGELOG-/u, '').replace(/-.+$/u, '');
    return {
      id: entryId,
      filePath: relativePath,
      title,
      summary
    } satisfies ReleaseNoteEntry;
  });
}

export function formatReleaseNotes(entries: ReleaseNoteEntry[]): string {
  if (entries.length === 0) {
    throw new Error('Cannot format release notes without entries.');
  }
  const sections = entries.map((entry) => {
    const summaryLines = entry.summary
      .split(/\r?\n/)
      .map((line) => line.replace(/\s+$/u, ''))
      .join('\n');
    return `### ${entry.title}\n${summaryLines}`;
  });
  return `## Summary\n\n${sections.join('\n\n')}\n`;
}

export interface ComposeResult {
  markdown: string;
  entries: ReleaseNoteEntry[];
}

export function composeReleaseNotes(options: ComposeReleaseNotesOptions): ComposeResult {
  const entries = collectEntries(options);
  const markdown = formatReleaseNotes(entries);
  const outputPath = options.outputPath ? resolve(options.workspace, options.outputPath) : undefined;
  if (outputPath) {
    ensureOutputDirectory(outputPath);
    writeFileSync(outputPath, `${markdown}`);
  }
  return { markdown, entries };
}
