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
  "variables/calculateMD5.html",
  "variables/calculateSignature.html",
  "enums/PaginationEnum.html",
  "variables/AUTH_HOSTNAME.html",
  "classes/ResponseJSONParseError.html",
  "classes/ApiClient.html",
  "variables/NOOP_LOGGER.html",
  "variables/resolveLogger.html",
  "classes/LazyApiClient.html",
  "classes/LazySmsApiClient.html",
  "classes/SmsDomainApi.html",
  "interfaces/Api.html",
  "interfaces/ApiClientOptions.html",
  "interfaces/CallbackProcessor.html",
  "variables/computeSignedData.html",
  "variables/calculateWebhookSignature.html",
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
  "classes/VoiceService.html",
  "interfaces/ApiListPromise.html",
  "interfaces/DateFormat.html",
  "classes/GenericError.html",
  "variables/generateAuthorizationHeader.html",
  "variables/validateAuthenticationHeader.html",
  "classes/VoiceCallbackWebhooks.html",
]) {
  if (!existsSync(join(docsDir, page))) {
    console.error(`Missing expected public API page: ${page}`);
    process.exit(1);
  }
}

const batchesApiHtml = readFileSync(
  join(docsDir, "classes/BatchesApi.html"),
  "utf8",
);
for (const internalMember of ["lazyClient", "apiName", "getSinchClient", "setHostname", "setCredentials"]) {
  if (batchesApiHtml.includes(`>${internalMember}<`)) {
    console.error(`BatchesApi.html should not document internal member: ${internalMember}`);
    process.exit(1);
  }
}

const callsApiHtml = readFileSync(
  join(docsDir, "classes/CallsApi.html"),
  "utf8",
);
for (const internalMember of ["lazyClient", "client", "setHostname", "setCredentials", "setRegion"]) {
  if (callsApiHtml.includes(`>${internalMember}<`)) {
    console.error(`CallsApi.html should not document internal member: ${internalMember}`);
    process.exit(1);
  }
}

const voiceServiceHtml = readFileSync(
  join(docsDir, "classes/VoiceService.html"),
  "utf8",
);
for (const serviceMember of ["setHostname", "setCredentials", "setRegion"]) {
  if (!voiceServiceHtml.includes(`>${serviceMember}<`)) {
    console.error(`VoiceService.html should document service-level member: ${serviceMember}`);
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

const smsCategory = navigation.find((item) => item.text === "SMS");
if (!smsCategory) {
  console.error("navigation.js: SMS category missing");
  process.exit(1);
}

const smsChildTexts = (smsCategory.children ?? []).map((item) => item.text);
if (!smsChildTexts.includes("Batches")) {
  console.error(`navigation.js: SMS should contain Batches group, got: ${smsChildTexts.join(", ")}`);
  process.exit(1);
}

const batchesGroup = (smsCategory.children ?? []).find((item) => item.text === "Batches");
if (!batchesGroup?.children?.some((item) => item.text === "BatchesApi")) {
  console.error("navigation.js: Batches group should contain BatchesApi");
  process.exit(1);
}

if (navigation.some((item) => item.text === "SMS / Batches")) {
  console.error("navigation.js: subdomains must be nested under domain categories, not top-level");
  process.exit(1);
}

console.log("API docs output verified");
