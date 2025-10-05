#!/usr/bin/env node
import {
  cpSync,
  existsSync,
  mkdirSync,
  rmSync,
  copyFileSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const outputDir = path.resolve(repoRoot, "var/pages");
const buildDir = path.resolve(repoRoot, "build/client");
const openApiDir = path.resolve(repoRoot, "var/openapi");
const manifestPath = path.resolve(buildDir, ".vite/manifest.json");

if (!existsSync(buildDir)) {
  throw new Error(
    "React Router build output not found. Run `npm run ui:build` before preparing pages."
  );
}

if (!existsSync(manifestPath)) {
  throw new Error(
    "Vite manifest not found. Ensure `npm run ui:build` completes and produces .vite/manifest.json."
  );
}

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });

cpSync(buildDir, outputDir, { recursive: true });

copyFileSync(path.join(openApiDir, "proxmox-ve.yaml"), path.join(outputDir, "proxmox-ve.yaml"));

const manifest = JSON.parse(readFileSync(manifestPath, "utf-8")) as Record<
  string,
  {
    file: string;
    isEntry?: boolean;
    name?: string;
    src?: string;
    imports?: string[];
    assets?: string[];
  }
>;

const manifestEntries = Object.entries(manifest);

const resolveEntry = (): (typeof manifest)[string] | undefined => {
  for (const [key, value] of manifestEntries) {
    if (value.isEntry && key.includes("entry.client")) {
      return value;
    }
  }
  for (const [, value] of manifestEntries) {
    if (value.isEntry) return value;
  }
  return undefined;
};

const findByKey = (key: string): (typeof manifest)[string] | undefined => {
  if (!key) return undefined;
  const candidates = [key, `/${key}`, `./${key}`];
  for (const candidate of candidates) {
    if (manifest[candidate]) return manifest[candidate];
  }
  return manifestEntries.find(([, value]) => value.file === key)?.[1];
};

const entry = resolveEntry();

if (!entry) {
  throw new Error("Unable to locate entry.client bundle in Vite manifest.");
}

const referencedEntries = new Set<(typeof manifest)[string]>([entry]);

for (const key of [...(entry.imports ?? []), ...(entry.dynamicImports ?? [])]) {
  const resolved = findByKey(key);
  if (resolved) referencedEntries.add(resolved);
}

const modulePreloads = Array.from(referencedEntries)
  .map((value) => value.file)
  .filter((value): value is string => Boolean(value) && value !== entry.file);

const stylesheetSet = new Set<string>(entry.assets ?? []);
for (const value of referencedEntries) {
  for (const css of value?.css ?? []) {
    stylesheetSet.add(css);
  }
}
for (const [, value] of manifestEntries) {
  if (value.file?.endsWith(".css")) {
    stylesheetSet.add(value.file);
  }
}
const stylesheets = Array.from(stylesheetSet);

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Proxmox API Viewer</title>
${stylesheets.map((href) => `    <link rel="stylesheet" crossorigin href="/${href}" />`).join("\n")}
${modulePreloads
  .map((href) => `    <link rel="modulepreload" crossorigin href="/${href}" />`)
  .join("\n")}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/${entry.file}"></script>
  </body>
</html>
`;

writeFileSync(path.join(outputDir, "index.html"), html.trimStart(), "utf-8");
