/** @typedef {import("typedoc").Reflection} Reflection */

import { ReflectionKind } from "typedoc";

/** Package directory name (under packages/) -> sidebar category. */
/** @type {Readonly<Record<string, string>>} */
export const PACKAGE_DIR_TO_CATEGORY = {
  "sdk-core": "SinchClient",
  "sdk-client": "Configuration & Utilities",
  sms: "SMS",
  conversation: "Conversation",
  fax: "Fax",
  numbers: "Numbers",
  voice: "Voice",
  verification: "Verification",
  "elastic-sip-trunking": "Elastic SIP Trunking",
  "number-lookup": "Number Lookup",
};

/** REST folder name -> sidebar subdomain label, per package directory. */
/** @type {Readonly<Record<string, Readonly<Record<string, string>>>>} */
export const SUBDOMAIN_LABELS = {
  conversation: {
    app: "Apps",
    callbacks: "Callbacks",
    capability: "Capability",
    consents: "Consents",
    contact: "Contacts",
    conversation: "Conversations",
    events: "Events",
    messages: "Messages",
    "project-settings": "Project Settings",
    "templates-v1": "Templates V1",
    "templates-v2": "Templates V2",
    transcoding: "Transcoding",
    webhooks: "Webhooks",
  },
  sms: {
    batches: "Batches",
    "delivery-reports": "Delivery Reports",
    groups: "Groups",
    inbounds: "Inbounds",
  },
  voice: {
    applications: "Applications",
    callouts: "Callouts",
    calls: "Calls",
    conferences: "Conferences",
  },
  verification: {
    "verification-status": "Verification Status",
    verifications: "Verifications",
  },
  numbers: {
    "active-number": "Active Numbers",
    "available-number": "Available Numbers",
    "available-regions": "Available Regions",
    callbacks: "Callbacks",
  },
  fax: {
    "cover-pages": "Cover Pages",
    "fax-to-email": "Fax to Email",
    faxes: "Faxes",
    services: "Services",
  },
  "elastic-sip-trunking": {
    "access-control-list": "Access Control List",
    "call-blocking-rules": "Call Blocking Rules",
    "calls-history": "Calls History",
    "country-permissions": "Country Permissions",
    "credential-lists": "Credential Lists",
    "phone-numbers": "Phone Numbers",
    projects: "Projects",
    "sip-endpoints": "SIP Endpoints",
    "sip-trunks": "SIP Trunks",
  },
  "number-lookup": {
    "number-lookup": "Number Lookup",
  },
};

/** @type {readonly string[]} */
export const EXCLUDED_SOURCE_PATH_FRAGMENTS = [
  "jest.fixture",
  ".jest.fixture.",
  "api-client-pagination-helper",
  "api-client-helpers",
  "sdk-client/dist/plugins/",
  "sdk-client/dist/getVersion",
  "lazy-api-client",
];

/** @type {readonly string[]} */
export const EXCLUDED_SYMBOL_NAMES = [
  "createNextPageMethod",
  "textToHex",
  "createIteratorMethodsForPagination",
  "hasMore",
  "calculateNextPage",
  "buildPaginationContext",
  "buildPageResultPromise",
  "sdkCoreVersion",
  "calculateMD5",
  "calculateSignature",
  "PaginationEnum",
  "AUTH_HOSTNAME",
  "REGION_PATTERN",
  "MAILGUN_HOSTNAME",
  "CONVERSATION_HOSTNAME",
  "CONVERSATION_TEMPLATES_HOSTNAME",
  "ELASTIC_SIP_TRUNKING_HOSTNAME",
  "FAX_HOSTNAME",
  "NUMBERS_HOSTNAME",
  "SMS_HOSTNAME",
  "VERIFICATION_HOSTNAME",
  "VOICE_HOSTNAME",
  "VOICE_APPLICATION_MANAGEMENT_HOSTNAME",
  "NUMBER_LOOKUP_HOSTNAME",
  "buildMailgunApiClientOptions",
  "buildOAuth2ApiClientOptions",
  "buildApplicationSignedApiClientOptions",
  "buildFlexibleOAuth2OrApiTokenApiClientOptions",
  "DEFAULT_SMS_REGION_DEPRECATION_WARNING",
  "DEFAULT_CONVERSATION_REGION_DEPRECATION_WARNING",
  "LazyApiClient",
  "NOOP_LOGGER",
  "CONSOLE_LOGGER",
  "resolveLogger",
  "resolveClientParameters",
  "SinchLogger",
  "isSinchLogger",
  "ApiClient",
  "Api",
  "ApiClientOptions",
  "CallbackProcessor",
  "computeSignedData",
  "calculateWebhookSignature",
];

/** Inherited or leaf-API members hidden from docs. */
/** @type {readonly string[]} */
export const INTERNAL_API_MEMBERS = [
  "lazyClient",
  "lazyConversationClient",
  "lazyConversationTemplateClient",
  "lazyVoiceClient",
  "lazyVoiceAppMgmtClient",
  "apiName",
  "client",
  "getSinchClient",
  "constructor",
  "setHostname",
  "setCredentials",
  "setRegion",
  "setApplication",
];

/** @type {readonly RegExp[]} */
export const EXCLUDED_NAME_PATTERNS = [
  /Fixture$/,
  /^Lazy\w*ApiClient$/,
  /DomainApi$/,
  /^ResponseJSONParseError$/,
  /^EmptyResponseError$/,
  /^Mailgun/,
  /^SupportedMailgun/,
  /^SigningRequest$/,
  /^VersionRequest$/,
  /^XTimestampRequest$/,
  /^BasicAuthenticationRequest$/,
  /^ApiTokenRequest$/,
  /^Oauth2TokenRequest$/,
  /^ExceptionResponse$/,
];

/** Sidebar category labels (for verify). */
export const PACKAGE_TO_CATEGORY = Object.fromEntries(
  Object.entries(PACKAGE_DIR_TO_CATEGORY).map(([dir, category]) => [
    `@sinch/${dir}`,
    category,
  ]),
);

/**
 * @param {Reflection} reflection
 * @returns {boolean}
 */
export function isTopLevelDeclaration(reflection) {
  if (!reflection.isDeclaration?.()) return false;
  const parent = reflection.parent;
  if (!parent) return false;
  return parent.kindOf(ReflectionKind.Project | ReflectionKind.Module);
}

/**
 * @param {Reflection} reflection
 * @returns {string | undefined}
 */
export function getSourcePath(reflection) {
  const source = reflection.sources?.[0];
  if (!source) return undefined;
  return source.fullFileName ?? source.fileName;
}

/**
 * @param {string | undefined} sourcePath
 * @returns {{ packageDir: string, subdomain: string } | undefined}
 */
export function resolveSubdomainFromPath(sourcePath) {
  if (!sourcePath) return undefined;

  const restMatch = sourcePath.match(
    /(?:\/packages\/([^/]+)\/(?:src|dist)|@sinch\/([^/]+)\/dist)\/rest\/v\d+\/([^/]+)\//,
  );
  if (restMatch) {
    return { packageDir: restMatch[1] ?? restMatch[2], subdomain: restMatch[3] };
  }

  const modelMatch = sourcePath.match(
    /(?:\/packages\/([^/]+)\/(?:src|dist)|@sinch\/([^/]+)\/dist)\/models\/v\d+\/([^/]+)\//,
  );
  if (modelMatch) {
    return { packageDir: modelMatch[1] ?? modelMatch[2], subdomain: modelMatch[3] };
  }

  return undefined;
}

/**
 * @param {Reflection} reflection
 * @returns {string | undefined}
 */
export function resolveGroup(reflection) {
  const sourcePath = getSourcePath(reflection);
  if (!sourcePath) return undefined;

  const isApiClass =
    reflection.name?.endsWith("Api") || reflection.name?.endsWith("Service");
  if (!isApiClass) return undefined;

  const subdomainInfo = resolveSubdomainFromPath(sourcePath);
  if (!subdomainInfo) return undefined;

  return SUBDOMAIN_LABELS[subdomainInfo.packageDir]?.[subdomainInfo.subdomain];
}

/**
 * @param {Reflection} reflection
 * @returns {string | undefined}
 */
export function resolveCategory(reflection) {
  const sourcePath = getSourcePath(reflection);
  if (!sourcePath) return undefined;

  for (const [packagePath, category] of Object.entries(PACKAGE_TO_CATEGORY)) {
    if (sourcePath.includes(packagePath)) return category;
  }

  const localPackage = sourcePath.match(/\/packages\/([^/]+)\//);
  if (localPackage && PACKAGE_DIR_TO_CATEGORY[localPackage[1]]) {
    return PACKAGE_DIR_TO_CATEGORY[localPackage[1]];
  }

  return undefined;
}

/**
 * @param {Reflection} reflection
 * @returns {boolean}
 */
export function isFirstPartySource(reflection) {
  const sourcePath = getSourcePath(reflection);
  if (!sourcePath) return false;
  return sourcePath.includes("@sinch/") || sourcePath.includes("/packages/");
}

/**
 * @param {Reflection | undefined} reflection
 * @returns {boolean}
 */
function isApiClassParent(reflection) {
  if (!reflection?.name) return false;
  if (reflection.name === "ApiClient") return false;
  return /Api$/.test(reflection.name);
}

/**
 * @param {Reflection} reflection
 * @returns {boolean}
 */
export function shouldExcludeMember(reflection) {
  if (isTopLevelDeclaration(reflection)) return false;

  const name = reflection.name;
  if (!name) return false;

  if (!INTERNAL_API_MEMBERS.includes(name)) return false;

  const parent = reflection.parent;
  if (!isApiClassParent(parent)) return false;

  return true;
}

/**
 * @param {Reflection} reflection
 * @returns {boolean}
 */
export function shouldExclude(reflection) {
  if (shouldExcludeMember(reflection)) return true;

  if (!isTopLevelDeclaration(reflection)) return false;

  const name = reflection.name;
  if (!name) return false;

  if (EXCLUDED_SYMBOL_NAMES.includes(name)) return true;
  if (EXCLUDED_NAME_PATTERNS.some((pattern) => pattern.test(name))) return true;

  const sourcePath = getSourcePath(reflection);
  if (
    sourcePath &&
    EXCLUDED_SOURCE_PATH_FRAGMENTS.some((fragment) => sourcePath.includes(fragment))
  ) {
    return true;
  }

  return false;
}
