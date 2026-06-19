import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const corePkg = JSON.parse(
  readFileSync(join(dir, "../../packages/sdk-core/package.json"), "utf8"),
);
const docsPkgPath = join(dir, "package.json");
const docsPkg = JSON.parse(readFileSync(docsPkgPath, "utf8"));

docsPkg.dependencies["@sinch/sdk-core"] = corePkg.version;
writeFileSync(docsPkgPath, `${JSON.stringify(docsPkg, null, 2)}\n`);
console.log(`Synced @sinch/sdk-core dependency to ${corePkg.version}`);
