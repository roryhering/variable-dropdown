// src/components/Editor/plugins/AutoComplete/index.js

export const autoCompleteVariables = (variables) => (context) => {
  // Create an array of options from the variables
  // [{ label: "Filling", type: "2620b98f-a4d3-4961-bf6a-e5babcd" }]
  const options = Object.entries(variables).map(([key, value]) => ({
    label: value,
    type: "text",
    apply: `"${key}"`,
  }));

  return {
    from: context.pos,
    options,
  };
};
