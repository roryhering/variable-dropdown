// src/App.jsx

import { useState } from "react";
import jsonLogic from "json-logic-js";

import { Editor } from "./components/Editor";

const variables = {
  "2620b98f-a4d3-4961-bf6a-e5babcd3b292": "Filling",
  "b0b1e5b1-4a7d-4b8a-8b2c-0b1b9c9c1b2b": "Temperature",
};

// if (Filling === "apple" && Temperature >= 310) return true;
const logicOriginal = `{
  "and": [ 
    {
      "==": [
        {
          "var": "2620b98f-a4d3-4961-bf6a-e5babcd3b292"
        },
        "apple"
      ]
    },
    {
      ">=": [
        {
          "var": "b0b1e5b1-4a7d-4b8a-8b2c-0b1b9c9c1b2b"
        },
        310
      ]
    }
  ]
}`;

const data = {
  "2620b98f-a4d3-4961-bf6a-e5babcd3b292": "apple",
  "b0b1e5b1-4a7d-4b8a-8b2c-0b1b9c9c1b2b": 310,
};

export const App = () => {
  const [logic, setLogic] = useState(logicOriginal);

  const checkLogic = () => {
    const logicParsed = JSON.parse(logic);
    alert(jsonLogic.apply(logicParsed, data));
  };

  return (
    <>
      <Editor variables={variables} logic={logic} setLogic={setLogic} />
      <button onClick={() => checkLogic()}>Check</button>

      <h2>Debugging</h2>
      <pre>{logic}</pre>
    </>
  );
};
