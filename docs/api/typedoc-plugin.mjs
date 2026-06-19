import { inflateSync } from "node:zlib";
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Reflection, Renderer } from "typedoc";

/** @param {import("typedoc").Application} app */
export function load(app) {
  app.renderer.on(Renderer.EVENT_PREPARE_INDEX, (event) => {
    const router = app.renderer.router;
    if (!router) return;
    const seen = new Set(event.searchResults);
    for (const target of router.getLinkTargets()) {
      if (
        target instanceof Reflection &&
        (target.isDeclaration() || target.isDocument()) &&
        target.name &&
        target.flags.isExternal &&
        !seen.has(target)
      ) {
        event.searchResults.push(target);
        seen.add(target);
      }
    }
  });

  app.renderer.on(Renderer.EVENT_END, () => {
    const out = app.options.getValue("out");
    patchForFileProtocol(out);
  });
}

/** @param {string} docsDir */
function patchForFileProtocol(docsDir) {
  const assets = join(docsDir, "assets");
  for (const [file, global] of [
    ["navigation.js", "navigationData"],
    ["search.js", "searchData"],
    ["hierarchy.js", "hierarchyData"],
  ]) {
    inflate(join(assets, file), global);
  }
  patchMain(join(assets, "main.js"));
  walkHtml(docsDir);
}

/** @param {string} file @param {string} global */
function inflate(file, global) {
  const src = readFileSync(file, "utf8");
  const head = `window.${global} = `;
  if (src.startsWith(head + "[") || src.startsWith(head + "{")) return;
  const b64 = src.slice(head.length + 1, src.lastIndexOf('"'));
  const data = JSON.parse(inflateSync(Buffer.from(b64, "base64")).toString());
  writeFileSync(file, `${head}${JSON.stringify(data)};\n`);
}

/** @param {string} file */
function patchMain(file) {
  let js = readFileSync(file, "utf8");
  const decompress =
    'async function R(t){let e=Uint8Array.from(atob(t),s=>s.charCodeAt(0)),r=new Blob([e]).stream().pipeThrough(new DecompressionStream("deflate")),i=await new Response(r).text();return JSON.parse(i)}';
  const fixed =
    'async function R(t){if(typeof t=="object")return t;let e=Uint8Array.from(atob(t),s=>s.charCodeAt(0)),r=new Blob([e]).stream().pipeThrough(new DecompressionStream("deflate")),i=await new Response(r).text();return JSON.parse(i)}';
  if (js.includes(decompress)) js = js.replace(decompress, fixed);
  else if (!js.includes(fixed)) throw new Error("Unexpected main.js");
  js = js
    .replace('throw new Error("Search controls missing")', "return")
    .replace(
      "fromLocalStorage(){let e=S.getItem(this.key);return e?e===\"true\":this.el.checked}",
      'fromLocalStorage(){if(this.el?.name==="external")return true;let e=S.getItem(this.key);return e?e==="true":this.el.checked}',
    );
  writeFileSync(file, js);
}

/** @param {string} file */
function patchHtml(file) {
  let html = readFileSync(file, "utf8");
  const a = html.includes("../assets/") ? "../assets/" : "assets/";

  html = html
    .replaceAll('<html class="default"', '<html class="default filter-external"')
    .replace(
      'document.documentElement.dataset.theme = localStorage.getItem("tsd-theme") || "os";',
      'try{document.documentElement.dataset.theme=localStorage.getItem("tsd-theme")||"os"}catch(e){document.documentElement.dataset.theme="os"};',
    )
    .replace(
      /<script (?:defer |async )src="(?:\.\.\/)?assets\/(?:main|icons|search|navigation|hierarchy)\.js"[^>]*><\/script>/g,
      "",
    )
    .replace(
      /(<link rel="stylesheet" href="(?:\.\.\/)?assets\/highlight\.css"\/>)/,
      `$1<script src="${a}navigation.js" id="tsd-nav-script"></script><script defer src="${a}main.js"></script>`,
    )
    .replace(
      "</body>",
      `<script defer src="${a}icons.js" id="tsd-icons-script"></script>` +
        `<script defer src="${a}search.js" id="tsd-search-script"></script>` +
        `<script defer src="${a}hierarchy.js" id="tsd-hierarchy-script"></script></body>`,
    );
  writeFileSync(file, html);
}

/** @param {string} dir */
function walkHtml(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walkHtml(path);
    else if (name.endsWith(".html")) patchHtml(path);
  }
}
