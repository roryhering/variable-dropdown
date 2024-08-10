// src/components/Editor/plugins/VariableDropdown/Widget.js

import { WidgetType } from "@codemirror/view";

export default class VariableDropdownWidget extends WidgetType {
  constructor(name, variables) {
    super();

    this.name = name;
    this.variables = variables;
    this.hasChanged = false;
  }

  eq(other) {
    return this.name === other.name;
  }

  toDOM() {
    // Create a dropdown element
    const select = document.createElement("select");
    select.className = "cm-variable-dropdown";

    // Add options to the dropdown
    Object.entries(this.variables).forEach(([key, value]) => {
      const option = document.createElement("option");
      option.value = key;
      option.text = value;
      select.appendChild(option);
    });

    // Set the selected value
    select.value = this.name;

    select.onchange = (e) => {
      this.hasChanged = true;
    };

    // Return the dropdown element
    return select;

    // let elt = document.createElement("span");
    // elt.style.cssText = `
    //   border: 1px solid #0000FF;
    //   border-radius: 8px;
    //   padding: 0 4px;
    //   background: #EEEEFF;`;
    // elt.textContent = this.variables[this.name];
    // return elt;
  }

  ignoreEvent() {
    if (this.hasChanged) {
      this.hasChanged = false;
      return false;
    }
    return true;
  }
}
