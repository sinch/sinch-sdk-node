import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const target = join(dir, "readme.md");

function resolveSdkCoreRoot() {
  const installed = join(dir, "node_modules/@sinch/sdk-core");
  const local = join(dir, "../../packages/sdk-core");
  if (existsSync(join(installed, "README.md"))) return installed;
  if (existsSync(join(local, "README.md"))) return local;
  throw new Error(
    "Cannot find @sinch/sdk-core README (run npm install or yarn build)",
  );
}

const sdkCoreRoot = resolveSdkCoreRoot();
const source = join(sdkCoreRoot, "README.md");
const { version } = JSON.parse(
  readFileSync(join(sdkCoreRoot, "package.json"), "utf8"),
);
const [major, minor] = version.split(".");
const repoBase = `https://github.com/sinch/sinch-sdk-node/tree/v${major}.${minor}`;

const content = readFileSync(source, "utf8")
  .replace(
    /\[(@sinch\/sdk-client)\]\(\.\.\/sdk-client\/README\.md\)/,
    `[$1](${repoBase}/packages/sdk-client)`,
  )
  .replace(
    /\[(\.\.\/\.\.\/examples\/simple-examples)\]\(\.\.\/\.\.\/examples\/simple-examples\)/,
    `[examples/simple-examples](${repoBase}/examples/simple-examples)`,
  );

writeFileSync(target, content);
console.log(`Prepared readme.md for @sinch/sdk-core v${version}`);
