import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const docsDir = join(dir, "docs");
const assets = join(docsDir, "assets");

if (!existsSync(join(docsDir, "index.html"))) {
  console.error("Missing docs/index.html — run typedoc first");
  process.exit(1);
}

for (const [file, global] of [
  ["navigation.js", "navigationData"],
  ["search.js", "searchData"],
  ["hierarchy.js", "hierarchyData"],
]) {
  const head = `window.${global} = `;
  const content = readFileSync(join(assets, file), "utf8");
  if (!content.startsWith(`${head}[`) && !content.startsWith(`${head}{`)) {
    console.error(`${file}: expected inflated JSON (${head}[ or {)`);
    process.exit(1);
  }
}

const main = readFileSync(join(assets, "main.js"), "utf8");
if (
  !main.includes('async function R(t){if(typeof t=="object")return t')
) {
  console.error("main.js: file-protocol patch missing (TypeDoc upgrade?)");
  process.exit(1);
}

if (!readFileSync(join(docsDir, "index.html"), "utf8").includes("filter-external")) {
  console.error("index.html: filter-external class missing");
  process.exit(1);
}

console.log("API docs output verified");
