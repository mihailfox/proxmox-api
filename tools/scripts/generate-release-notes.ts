#!/usr/bin/env node
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import process from "node:process";

interface CliOptions {
  outputPath: string;
  repo: string;
  since?: string;
  until?: string;
  state: "closed" | "open" | "all";
  labels?: string[];
  dryRun: boolean;
  includeIssues: number[];
}

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {
    outputPath: "var/reports/release-notes.md",
    repo: process.env.GITHUB_REPOSITORY ?? "",
    state: "closed",
    dryRun: false,
    includeIssues: [],
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith("--")) continue;
    const [key, provided] = arg.includes("=") ? arg.split(/=(.+)/, 2) : [arg, undefined];
    const value = provided ?? argv[index + 1];
    switch (key) {
      case "--output":
        options.outputPath = value;
        if (provided === undefined) index += 1;
        break;
      case "--repo":
        options.repo = value;
        if (provided === undefined) index += 1;
        break;
      case "--since":
        options.since = value;
        if (provided === undefined) index += 1;
        break;
      case "--until":
        options.until = value;
        if (provided === undefined) index += 1;
        break;
      case "--labels":
        options.labels = value.split(",").map((label) => label.trim()).filter(Boolean);
        if (provided === undefined) index += 1;
        break;
      case "--include":
        options.includeIssues = value
          .split(",")
          .map((token) => token.trim())
          .filter(Boolean)
          .map((token) => {
            const normalized = token.startsWith("#") ? token.slice(1) : token;
            const parsed = Number.parseInt(normalized, 10);
            if (Number.isNaN(parsed)) {
              throw new Error(`Invalid issue number: ${token}`);
            }
            return parsed;
          });
        if (provided === undefined) index += 1;
        break;
      case "--state":
        if (value === "open" || value === "closed" || value === "all") {
          options.state = value;
        } else {
          throw new Error(`Invalid state: ${value}`);
        }
        if (provided === undefined) index += 1;
        break;
      case "--dry-run":
        options.dryRun = true;
        break;
      default:
        throw new Error(`Unknown option ${key}`);
    }
  }

  if (!options.repo) {
    throw new Error("Repository not specified. Pass --repo owner/name or set GITHUB_REPOSITORY.");
  }

  return options;
}

interface IssueSummary {
  number: number;
  title: string;
  url: string;
  closedAt?: string;
  labels: string[];
}

async function fetchIssues(options: CliOptions, token: string): Promise<IssueSummary[]> {
  const [owner, repo] = options.repo.split("/");
  if (!owner || !repo) {
    throw new Error(`Invalid repo value: ${options.repo}`);
  }

  const params = new URLSearchParams({
    state: options.state,
    per_page: "100",
    direction: "desc",
    sort: "updated",
  });

  if (options.since) {
    params.set("since", options.since);
  }
  if (options.labels && options.labels.length > 0) {
    params.set("labels", options.labels.join(","));
  }

  const baseUrl = `https://api.github.com/repos/${owner}/${repo}/issues?${params.toString()}`;
  let url: string | undefined = baseUrl;
  const results: IssueSummary[] = [];

  while (url) {
    const response: Response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "User-Agent": `${owner}-${repo}-release-notes-script`,
      },
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`GitHub API request failed (${response.status}): ${body}`);
    }

    const data = (await response.json()) as Array<Record<string, unknown>>;
    for (const entry of data) {
      if (entry.pull_request) continue; // exclude PRs
      const issue: IssueSummary = {
        number: entry.number as number,
        title: entry.title as string,
        url: entry.html_url as string,
        closedAt: entry.closed_at as string | undefined,
        labels: Array.isArray(entry.labels)
          ? (entry.labels as Array<{ name?: string }>).map((label) => label.name ?? "")
          : [],
      };
      if (options.until && issue.closedAt && issue.closedAt > options.until) {
        continue;
      }
      results.push(issue);
    }

    const linkHeader: string | null = response.headers.get("link");
    const nextUrl: string | undefined = linkHeader
      ?.split(",")
      .map((part: string) => part.trim())
      .find((part: string) => part.endsWith("rel=\"next\""))
      ?.match(/<([^>]+)>/)
      ?.at(1);
    url = nextUrl ?? undefined;
    if (!options.since) {
      // Without a since filter, avoid excessive pagination.
      break;
    }
  }

  return results;
}

async function fetchIssueByNumber(
  repo: string,
  issueNumber: number,
  token: string
): Promise<IssueSummary | undefined> {
  const [owner, name] = repo.split("/");
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${name}/issues/${issueNumber}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "User-Agent": `${owner}-${name}-release-notes-script`,
      },
    }
  );
  if (!response.ok) {
    return undefined;
  }
  const entry = (await response.json()) as Record<string, unknown>;
  if (entry.pull_request) return undefined;
  return {
    number: entry.number as number,
    title: entry.title as string,
    url: entry.html_url as string,
    closedAt: entry.closed_at as string | undefined,
    labels: Array.isArray(entry.labels)
      ? (entry.labels as Array<{ name?: string }>).map((label) => label.name ?? "")
      : [],
  };
}

function renderMarkdown(issues: IssueSummary[]): string {
  if (issues.length === 0) {
    return "## Release Notes\n\n_No closed issues found for this range._\n";
  }

  const lines = ["## Release Notes", "", "### Closed Issues", ""];
  for (const issue of issues) {
    const labels = issue.labels.filter(Boolean);
    const labelText = labels.length > 0 ? ` _(labels: ${labels.join(", ")})_` : "";
    lines.push(`- #${issue.number} ${issue.title}${labelText} ([link](${issue.url}))`);
  }
  lines.push("", `Total closed issues: ${issues.length}`);
  return lines.join("\n");
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  const token =
    process.env.GITHUB_TOKEN ??
    process.env.GH_TOKEN ??
    process.env.RELEASE_NOTES_TOKEN ??
    "";

  if (!token) {
    throw new Error("GITHUB_TOKEN (or GH_TOKEN/RELEASE_NOTES_TOKEN) is required to query issues.");
  }

  const issues = await fetchIssues(options, token);

  if (options.includeIssues.length > 0) {
    const existingNumbers = new Set(issues.map((issue) => issue.number));
    for (const issueNumber of options.includeIssues) {
      if (existingNumbers.has(issueNumber)) continue;
      const extra = await fetchIssueByNumber(options.repo, issueNumber, token);
      if (extra) {
        issues.push(extra);
      }
    }
    issues.sort((a, b) => (a.closedAt ?? "") > (b.closedAt ?? "") ? -1 : 1);
  }
  const markdown = renderMarkdown(issues);

  if (options.dryRun) {
    process.stdout.write(markdown);
    return;
  }

  const target = resolve(options.outputPath);
  writeFileSync(target, markdown, "utf-8");
  process.stdout.write(`Wrote release notes to ${target}\n`);
}

main().catch((error) => {
  if (error instanceof Error) {
    process.stderr.write(`Error: ${error.message}\n`);
  } else {
    process.stderr.write("Unknown error\n");
  }
  process.exitCode = 1;
});
