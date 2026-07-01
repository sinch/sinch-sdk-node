import { DefaultTheme } from "typedoc";
import {
  PACKAGE_DIR_TO_CATEGORY,
  resolveGroup,
} from "./doc-organization.mjs";

/** @type {Map<number, string>} */
const reflectionGroups = new Map();

/**
 * @param {import("typedoc").DeclarationReflection} reflection
 */
export function trackReflectionGroup(reflection) {
  const group = resolveGroup(reflection);
  if (group && reflection.id != null) {
    reflectionGroups.set(reflection.id, group);
  }
}

/** @type {Readonly<Record<string, string[]>>} */
const GROUP_ORDER_BY_CATEGORY = {
  SMS: ["Batches", "Delivery Reports", "Groups", "Inbounds"],
  Conversation: [
    "Apps",
    "Callbacks",
    "Capability",
    "Consents",
    "Contacts",
    "Conversations",
    "Events",
    "Messages",
    "Project Settings",
    "Templates V1",
    "Templates V2",
    "Transcoding",
    "Webhooks",
  ],
  Voice: ["Applications", "Callouts", "Calls", "Conferences"],
  Verification: ["Verification Status", "Verifications"],
  Numbers: [
    "Active Numbers",
    "Available Numbers",
    "Available Regions",
    "Callbacks",
  ],
  Fax: ["Cover Pages", "Fax to Email", "Faxes", "Services"],
  "Elastic SIP Trunking": [
    "Access Control List",
    "Call Blocking Rules",
    "Calls History",
    "Country Permissions",
    "Credential Lists",
    "Phone Numbers",
    "Projects",
    "SIP Endpoints",
    "SIP Trunks",
  ],
  "Number Lookup": ["Number Lookup"],
};

/**
 * @param {import("typedoc").Router} router
 * @param {string | undefined} path
 * @returns {string | undefined}
 */
function resolveGroupForNavPath(router, path) {
  if (!path) return undefined;

  for (const target of router.getLinkTargets()) {
    if (!("id" in target)) continue;
    if (router.getFullUrl(target) !== path) continue;
    return reflectionGroups.get(target.id);
  }

  return undefined;
}

/**
 * @param {string} category
 * @param {string[]} groupNames
 * @returns {string[]}
 */
function sortGroupNames(category, groupNames) {
  const preferred = GROUP_ORDER_BY_CATEGORY[category] ?? [];
  return [...groupNames].sort((a, b) => {
    const ai = preferred.indexOf(a);
    const bi = preferred.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}

/**
 * @param {Array<{ text?: string; path?: string; children?: unknown[] }>} children
 * @param {import("typedoc").Router} router
 * @param {string} category
 */
function nestGroupsInCategoryChildren(children, router, category) {
  /** @type {Array<{ text?: string; path?: string; children?: unknown[] }>} */
  const ungrouped = [];
  /** @type {Map<string, Array<{ text?: string; path?: string; children?: unknown[] }>>} */
  const grouped = new Map();

  for (const child of children) {
    if (child.children?.length) {
      ungrouped.push(child);
      continue;
    }

    const group = resolveGroupForNavPath(router, child.path);
    if (!group) {
      ungrouped.push(child);
      continue;
    }

    const bucket = grouped.get(group) ?? [];
    bucket.push(child);
    grouped.set(group, bucket);
  }

  if (grouped.size === 0) return children;

  const nested = [...ungrouped];
  for (const groupName of sortGroupNames(category, [...grouped.keys()])) {
    nested.push({
      text: groupName,
      children: grouped.get(groupName),
    });
  }

  return nested;
}

export class SinchTheme extends DefaultTheme {
  buildNavigation(project) {
    const navigation = super.buildNavigation(project);
    const domainCategories = new Set(Object.values(PACKAGE_DIR_TO_CATEGORY));

    return navigation.map((categoryNode) => {
      if (!domainCategories.has(categoryNode.text) || !categoryNode.children) {
        return categoryNode;
      }

      return {
        ...categoryNode,
        children: nestGroupsInCategoryChildren(
          categoryNode.children,
          this.router,
          categoryNode.text,
        ),
      };
    });
  }
}
