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
  resolveGroup,
  shouldExclude,
} from "./doc-organization.mjs";
import { SinchTheme, trackReflectionGroup } from "./sinch-theme.mjs";

/** @param {import("typedoc").Application} app */
export function load(app) {
  app.renderer.defineTheme("sinch", SinchTheme);

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

    const group = resolveGroup(reflection);
    if (group) {
      trackReflectionGroup(reflection);
      reflection.comment.blockTags.push(
        new CommentTag("@group", [{ kind: "text", text: group }]),
      );
    }
  });

  // Sources are needed during resolve for categorization, but dist/ paths are
  // not useful in rendered docs (gitignored, no GitHub links). Strip before HTML.
  app.converter.on(Converter.EVENT_RESOLVE_END, (context) => {
    for (const reflection of Object.values(context.project.reflections)) {
      reflection.sources = undefined;
    }
  });
}
