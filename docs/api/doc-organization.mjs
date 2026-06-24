/** @typedef {import("typedoc").Reflection} Reflection */

import { ReflectionKind } from "typedoc";

/** Package directory name (under packages/) -> sidebar category. */
/** @type {Readonly<Record<string, string>>} */
export const PACKAGE_DIR_TO_CATEGORY = {
  "sdk-core": "Sinch Client",
  "sdk-client": "SDK Client",
  sms: "SMS",
  conversation: "Conversation",
  fax: "Fax",
  numbers: "Numbers",
  voice: "Voice",
  verification: "Verification",
  "elastic-sip-trunking": "Elastic SIP Trunking",
  "number-lookup": "Number Lookup",
};

/** @type {readonly string[]} */
export const EXCLUDED_SOURCE_PATH_FRAGMENTS = [
  "jest.fixture",
  ".jest.fixture.",
  "api-client-pagination-helper",
  "api-client-helpers",
  "sdk-client/dist/plugins/",
  "sdk-client/dist/getVersion",
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
];

/** @type {readonly RegExp[]} */
export const EXCLUDED_NAME_PATTERNS = [
  /Fixture$/,
  /^Lazy\w+ApiClient$/,
  /DomainApi$/,
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
 * @param {Reflection} reflection
 * @returns {boolean}
 */
export function shouldExclude(reflection) {
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
