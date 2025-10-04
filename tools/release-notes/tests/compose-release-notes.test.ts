import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import {
  collectEntries,
  composeReleaseNotes,
  formatReleaseNotes,
  parseReleaseItems,
  type ComposeReleaseNotesOptions
} from '../src/compose-release-notes.ts';

const createdDirectories: string[] = [];

function createWorkspace(): string {
  const directory = mkdtempSync(join(tmpdir(), 'release-notes-'));
  createdDirectories.push(directory);
  mkdirSync(join(directory, 'versions'));
  return directory;
}

afterEach(() => {
  while (createdDirectories.length > 0) {
    const directory = createdDirectories.pop();
    if (directory) {
      rmSync(directory, { recursive: true, force: true });
    }
  }
});

function createChangelog(
  workspace: string,
  fileName: string,
  summaryLines: string[],
  additionalSections: string[] = []
): void {
  const filePath = join(workspace, 'versions', fileName);
  const content = [
    `# ${fileName.replace('CHANGELOG-', '').replace(/\.md$/u, '')}`,
    '',
    '## Summary',
    ...summaryLines,
    '',
    ...additionalSections
  ].join('\n');
  writeFileSync(filePath, content, 'utf8');
}

describe('parseReleaseItems', () => {
  it('splits comma and semicolon delimited values', () => {
    expect(parseReleaseItems('TASK-0001, ISSUE-0002;TASK-0003')).toEqual(['TASK-0001', 'ISSUE-0002', 'TASK-0003']);
  });

  it('trims whitespace and removes duplicates', () => {
    expect(parseReleaseItems(' TASK-0001 ; TASK-0001 , ISSUE-0002 ')).toEqual(['TASK-0001', 'ISSUE-0002']);
  });

  it('returns empty array when input missing', () => {
    expect(parseReleaseItems(undefined)).toEqual([]);
    expect(parseReleaseItems(null)).toEqual([]);
    expect(parseReleaseItems('')).toEqual([]);
  });
});

describe('collectEntries', () => {
  it('selects latest PR changelog for a given ID', () => {
    const workspace = createWorkspace();
    createChangelog(workspace, 'CHANGELOG-TASK-0001-plan-1.md', ['- Planned work']);
    createChangelog(workspace, 'CHANGELOG-TASK-0001-PR-1.md', ['- Initial summary']);
    createChangelog(workspace, 'CHANGELOG-TASK-0001-PR-2.md', ['- Final summary']);

    const entries = collectEntries({ workspace, items: ['TASK-0001'] });
    expect(entries).toHaveLength(1);
    expect(entries[0]?.filePath).toBe('versions/CHANGELOG-TASK-0001-PR-2.md');
    expect(entries[0]?.summary).toContain('Final summary');
  });

  it('reads changed files when explicit items missing', () => {
    const workspace = createWorkspace();
    createChangelog(workspace, 'CHANGELOG-TASK-0002-PR-1.md', ['- Example summary']);

    const entries = collectEntries({
      workspace,
      changedFiles: ['versions/CHANGELOG-TASK-0002-PR-1.md']
    });

    expect(entries).toHaveLength(1);
    expect(entries[0]?.title).toContain('TASK-0002-PR-1');
  });

  it('throws when summary missing', () => {
    const workspace = createWorkspace();
    const fileName = 'CHANGELOG-TASK-0003-PR-1.md';
    const filePath = join(workspace, 'versions', fileName);
    const content = ['# TASK-0003 — Empty summary', '', '## Notes', '- Missing summary section'].join('\n');
    writeFileSync(filePath, content, 'utf8');

    expect(() => collectEntries({ workspace, items: ['TASK-0003'] })).toThrow(/Summary/);
  });
});

describe('formatReleaseNotes', () => {
  it('formats summaries with headings', () => {
    const markdown = formatReleaseNotes([
      {
        id: 'TASK-0004',
        filePath: 'versions/CHANGELOG-TASK-0004-PR-1.md',
        title: 'TASK-0004 — Demo',
        summary: '- Added feature'
      }
    ]);

    expect(markdown).toBe('## Summary\n\n### TASK-0004 — Demo\n- Added feature\n');
  });
});

describe('composeReleaseNotes', () => {
  it('writes output file when provided', () => {
    const workspace = createWorkspace();
    createChangelog(workspace, 'CHANGELOG-TASK-0005-PR-1.md', ['- Output summary']);

    const options: ComposeReleaseNotesOptions = {
      workspace,
      items: ['TASK-0005'],
      outputPath: 'out/release.md'
    };

    const result = composeReleaseNotes(options);
    expect(result.markdown).toContain('TASK-0005');
    const filePath = join(workspace, 'out', 'release.md');
    const contents = readFileSync(filePath, 'utf8');
    expect(contents).toEqual(result.markdown);
  });
});
