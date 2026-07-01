import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const localEntry = join(dir, "../../packages/sdk-core/dist/index.d.ts");
const monorepoRoot = join(dir, "../../packages/sdk-core/package.json");

const packages = [
  "sdk-client",
  "conversation",
  "elastic-sip-trunking",
  "fax",
  "number-lookup",
  "numbers",
  "sms",
  "verification",
  "voice",
  "sdk-core",
];

if (existsSync(localEntry)) {
  console.log("Monorepo detected — using local @sinch package builds");
  const specs = packages
    .map((name) => `file:${join(dir, "../../packages", name)}`)
    .join(" ");
  execSync(`npm install --no-save ${specs}`, { cwd: dir, stdio: "inherit" });
} else if (existsSync(monorepoRoot)) {
  console.error(
    "Monorepo packages are not built. From the repository root, run: yarn build",
  );
  process.exit(1);
} else {
  console.error(
    "API docs must be built from the sinch-sdk-node monorepo (local packages only).",
  );
  process.exit(1);
}
