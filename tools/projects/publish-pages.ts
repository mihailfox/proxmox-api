#!/usr/bin/env node
import { mkdirSync, copyFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const outputDir = path.resolve(repoRoot, 'var/pages');
const openApiDir = path.resolve(repoRoot, 'var/openapi');

mkdirSync(outputDir, { recursive: true });
copyFileSync(path.join(openApiDir, 'proxmox-ve.json'), path.join(outputDir, 'proxmox-ve.json'));
copyFileSync(path.join(openApiDir, 'proxmox-ve.yaml'), path.join(outputDir, 'proxmox-ve.yaml'));

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Proxmox VE OpenAPI</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui.css" />
    <style>
      body { margin: 0; }
      #swagger-ui { height: 100vh; }
    </style>
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui-bundle.js"></script>
    <script>
      window.addEventListener('load', () => {
        SwaggerUIBundle({
          url: 'proxmox-ve.json',
          dom_id: '#swagger-ui',
          presets: [SwaggerUIBundle.presets.apis],
          layout: 'BaseLayout'
        });
      });
    </script>
  </body>
</html>`;

writeFileSync(path.join(outputDir, 'index.html'), html);
