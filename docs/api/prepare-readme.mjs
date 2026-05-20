import { readFileSync, writeFileSync } from "node:fs";

const source = "node_modules/@sinch/sdk-core/README.md";
const target = "readme.md";
const repoBase = "https://github.com/sinch/sinch-sdk-node/tree/v1.4";

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
