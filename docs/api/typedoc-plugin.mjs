import {
  Comment,
  CommentTag,
  Converter,
  ReflectionFlag,
} from "typedoc";
import {
  isFirstPartySource,
  isTopLevelDeclaration,
  resolveCategory,
  shouldExclude,
} from "./doc-organization.mjs";

/** @param {import("typedoc").Application} app */
export function load(app) {
  app.converter.on(Converter.EVENT_RESOLVE_BEGIN, (context) => {
    const toRemove = [];
    for (const reflection of Object.values(context.project.reflections)) {
      if (shouldExclude(reflection)) {
        toRemove.push(reflection);
      }
    }
    for (const reflection of toRemove) {
      context.project.removeReflection(reflection);
    }
  });

  app.converter.on(Converter.EVENT_RESOLVE, (context, reflection) => {
    if (isFirstPartySource(reflection)) {
      reflection.setFlag(ReflectionFlag.External, false);
    }

    if (!isTopLevelDeclaration(reflection)) return;

    const category = resolveCategory(reflection);
    if (!category) return;

    reflection.comment ??= new Comment();
    reflection.comment.blockTags.push(
      new CommentTag("@category", [{ kind: "text", text: category }]),
    );
  });
}
