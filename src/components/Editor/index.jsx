// src/components/Editor/index.jsx

import { autocompletion } from "@codemirror/autocomplete";

import { useCodeEditor } from "./hooks/codeEditor";
import { variableDropdownPlugin } from "./plugins/VariableDropdown";
import { autoCompleteVariables } from "./plugins/AutoComplete";

const CodeEditor = ({ value, onChange, extensions }) => {
  const ref = useCodeEditor({ value, onChange, extensions });
  return <div ref={ref} />;
};

export const Editor = ({ variables, logic, setLogic }) => {
  const handleChange = (value) => {
    setLogic(value);
  };

  return (
    <div>
      <CodeEditor
        value={logic}
        onChange={handleChange}
        extensions={[
          variableDropdownPlugin(variables),
          autocompletion({
            activateOnTyping: false,
            override: [autoCompleteVariables(variables)],
          }),
        ]}
      />
    </div>
  );
};
