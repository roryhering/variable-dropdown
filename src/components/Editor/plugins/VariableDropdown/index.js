// src/components/Editor/plugins/VariableDropdown/index.js

import {
  Decoration,
  EditorView,
  ViewPlugin,
  MatchDecorator,
} from "@codemirror/view";

import VariableDropdownWidget from "./VariableDropdownWidget";

const createPlaceholderMatcher = (variables) =>
  new MatchDecorator({
    // Get the uuid between quotes (e.g. "123e4567-e89b-12d3-a456-426614174000")
    regexp:
      /"([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})"/g,
    decoration: (match) =>
      Decoration.replace({
        widget: new VariableDropdownWidget(match[1], variables),
      }),
  });

export const variableDropdownPlugin = (variables) => {
  const placeholderMatcher = createPlaceholderMatcher(variables);

  return ViewPlugin.fromClass(
    class {
      placeholders;
      constructor(view) {
        this.placeholders = placeholderMatcher.createDeco(view);
      }
      update(update) {
        this.placeholders = placeholderMatcher.updateDeco(
          update,
          this.placeholders
        );
      }
    },
    {
      decorations: (instance) => instance.placeholders,
      provide: (plugin) =>
        EditorView.atomicRanges.of((view) => {
          return view.plugin(plugin)?.placeholders || Decoration.none;
        }),
      eventHandlers: {
        change: (e, view) => {
          const { target } = e;
          if (
            target.nodeName == "SELECT" &&
            target.classList.contains("cm-variable-dropdown")
          ) {
            const pos = view.posAtDOM(target);
            const charCount = target.value.length;
            view.dispatch({
              changes: {
                from: pos + 1,
                to: pos + charCount + 1,
                insert: target.value,
              },
            });

            return false;
          }
        },
      },
    }
  );
};
