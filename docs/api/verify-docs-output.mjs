import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { inflateSync } from "node:zlib";
import { PACKAGE_DIR_TO_CATEGORY } from "./doc-organization.mjs";

const dir = dirname(fileURLToPath(import.meta.url));
const docsDir = join(dir, "docs");

if (!existsSync(join(docsDir, "index.html"))) {
  console.error("Missing docs/index.html — run typedoc first");
  process.exit(1);
}

for (const page of [
  "classes/CallbackConfigurationApiFixture.html",
  "variables/createNextPageMethod.html",
  "variables/textToHex.html",
]) {
  if (existsSync(join(docsDir, page))) {
    console.error(`Excluded page should not exist: ${page}`);
    process.exit(1);
  }
}

for (const page of [
  "classes/SinchClient.html",
  "classes/BatchesApi.html",
  "classes/ServicesApi.html",
]) {
  if (!existsSync(join(docsDir, page))) {
    console.error(`Missing expected public API page: ${page}`);
    process.exit(1);
  }
}

const navContent = readFileSync(join(docsDir, "assets/navigation.js"), "utf8");
const head = "window.navigationData = ";
let navigation;
if (navContent.startsWith(`${head}"`)) {
  const b64 = navContent.slice(head.length + 1, navContent.lastIndexOf('"'));
  navigation = JSON.parse(inflateSync(Buffer.from(b64, "base64")).toString());
} else if (navContent.startsWith(`${head}[`)) {
  navigation = JSON.parse(navContent.slice(head.length).replace(/;\s*$/, ""));
} else {
  console.error("navigation.js: unexpected format");
  process.exit(1);
}

const sinchClient = navigation
  .flatMap((cat) => cat.children ?? [])
  .find((item) => item.text === "SinchClient");
if (!sinchClient) {
  console.error("navigation.js: SinchClient entry missing");
  process.exit(1);
}
if (sinchClient.class?.includes("tsd-is-external")) {
  console.error("navigation.js: SinchClient must not be marked tsd-is-external");
  process.exit(1);
}

for (const category of Object.values(PACKAGE_DIR_TO_CATEGORY)) {
  if (!navigation.some((item) => item.text === category)) {
    console.error(`navigation.js: missing domain category: ${category}`);
    process.exit(1);
  }
}

console.log("API docs output verified");
