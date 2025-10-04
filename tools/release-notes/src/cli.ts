import { execSync } from "node:child_process";
import process from "node:process";
import {
  composeReleaseNotes,
  parseReleaseItems,
  type ComposeReleaseNotesOptions,
  isChangelogFilePath,
} from "./compose-release-notes.ts";

interface CliOptions {
  items?: string[];
  outputPath?: string;
  baseRef?: string;
  headRef?: string;
}

function parseArguments(argv: string[]): CliOptions {
  const options: CliOptions = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith("--")) {
      continue;
    }
    const [key, rawValue] = arg.includes("=") ? arg.split(/=(.+)/, 2) : [arg, undefined];
    const value = rawValue ?? argv[index + 1];
    switch (key) {
      case "--items":
        options.items = parseReleaseItems(value);
        if (rawValue === undefined) {
          index += 1;
        }
        break;
      case "--output":
        options.outputPath = value;
        if (rawValue === undefined) {
          index += 1;
        }
        break;
      case "--base-ref":
        options.baseRef = value;
        if (rawValue === undefined) {
          index += 1;
        }
        break;
      case "--head-ref":
        options.headRef = value;
        if (rawValue === undefined) {
          index += 1;
        }
        break;
      default:
        throw new Error(`Unknown argument: ${key}`);
    }
  }
  return options;
}

function discoverChangedChangelogFiles(
  workspace: string,
  baseRef?: string,
  headRef = "HEAD"
): string[] {
  const resolvedHead = headRef || "HEAD";
  let resolvedBase = baseRef;
  if (!resolvedBase || resolvedBase.length === 0) {
    const tagOutput = execSync(
      "git tag --list 'v[0-9]*.[0-9]*.[0-9A-Za-z.+-]*' --sort=-version:refname | head -n1",
      {
        cwd: workspace,
        encoding: "utf8",
      }
    ).trim();
    if (tagOutput.length > 0) {
      resolvedBase = tagOutput;
    } else {
      const initialCommit = execSync("git rev-list --max-parents=0 HEAD", {
        cwd: workspace,
        encoding: "utf8",
      })
        .split(/\r?\n/)
        .filter(Boolean)
        .at(0);
      resolvedBase = initialCommit ?? resolvedHead;
    }
  }
  const diffRange = `${resolvedBase}..${resolvedHead}`;
  const diffOutput = execSync(`git diff --name-only ${diffRange}`, {
    cwd: workspace,
    encoding: "utf8",
  });
  return diffOutput
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && isChangelogFilePath(line));
}

export function runCli(argv: string[]): void {
  const workspace = process.cwd();
  const args = parseArguments(argv);
  const options: ComposeReleaseNotesOptions = {
    workspace,
    outputPath: args.outputPath ?? "var/reports/release-notes.md",
  };

  if (args.items && args.items.length > 0) {
    options.items = args.items;
  } else {
    const changedFiles = discoverChangedChangelogFiles(workspace, args.baseRef, args.headRef);
    options.changedFiles = changedFiles;
  }

  const { markdown, entries } = composeReleaseNotes(options);
  process.stdout.write(
    `Collected ${entries.length} changelog entr${entries.length === 1 ? "y" : "ies"}\n`
  );
  process.stdout.write(`${markdown}\n`);
}

export function main(): void {
  try {
    runCli(process.argv.slice(2));
  } catch (error) {
    if (error instanceof Error) {
      process.stderr.write(`Error: ${error.message}\n`);
    } else {
      process.stderr.write("Unknown error\n");
    }
    process.exitCode = 1;
  }
}

if (process.argv[1]?.endsWith("cli.ts")) {
  main();
}
