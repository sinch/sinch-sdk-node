/**
 * Ensures every npm script in examples/snippets/package.json that runs
 * `node <path>.js` points at an existing file. For CI only.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..', '..');
const snippetsRoot = path.join(repoRoot, 'examples', 'snippets');
const pkgPath = path.join(snippetsRoot, 'package.json');

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const scripts = pkg.scripts ?? {};

const errors = [];
let verified = 0;

for (const [name, cmd] of Object.entries(scripts)) {
  const trimmed = String(cmd).trimStart();
  if (!trimmed.startsWith('node ')) {
    continue;
  }

  const afterNode = trimmed.slice(5).trim();
  const match = afterNode.match(/^([^\s]+\.js)\b/);
  if (!match) {
    errors.push(`Script "${name}": could not parse a .js entry file from: ${cmd}`);
    continue;
  }

  const relPath = match[1].replace(/^\.\//, '');
  const absPath = path.resolve(snippetsRoot, relPath);

  if (!fs.existsSync(absPath)) {
    errors.push(
      `Script "${name}": file not found: ${path.relative(snippetsRoot, absPath)}`,
    );
    continue;
  }

  verified += 1;
}

if (errors.length > 0) {
  console.error('Snippet script path verification failed:\n');
  for (const line of errors) {
    console.error(`  - ${line}`);
  }
  process.exit(1);
}

console.log(`OK: ${verified} node snippet script path(s) exist under examples/snippets.`);
