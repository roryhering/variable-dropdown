// src/components/Editor/hooks/codeMirror.js

import { useState, useRef, useEffect } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { json } from "@codemirror/lang-json";

export const useCodeMirror = ({ value, extensions }) => {
  const ref = useRef();
  const [view, setView] = useState();

  useEffect(() => {
    const view = new EditorView({
      state: EditorState.create({
        doc: value,
        extensions: [basicSetup, json(), ...extensions],
      }),
      parent: ref.current,
    });

    setView(view);

    return () => {
      view.destroy();
      setView(undefined);
    };
  }, []);

  return { ref, view };
};
