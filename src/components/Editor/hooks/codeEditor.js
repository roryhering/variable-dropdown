// src/components/Editor/hooks/codeEditor.js

import { useEffect } from "react";
import { EditorView } from "@codemirror/view";

import { useCodeMirror } from "./codeMirror";

const onUpdate = (onChange) => {
  return EditorView.updateListener.of((viewUpdate) => {
    if (viewUpdate.docChanged) {
      const { doc } = viewUpdate.state;
      const value = doc.toString();
      onChange(value, viewUpdate);
    }
  });
};

export const useCodeEditor = ({ value, onChange, extensions }) => {
  const { ref, view } = useCodeMirror({
    value,
    extensions: [onUpdate(onChange), ...extensions],
  });

  useEffect(() => {
    if (view) {
      const editorValue = view.state.doc.toString();

      if (value !== editorValue) {
        view.dispatch({
          changes: {
            from: 0,
            to: editorValue.length,
            insert: value || "",
          },
        });
      }
    }
  }, [value, view]);

  return ref;
};
