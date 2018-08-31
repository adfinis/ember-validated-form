import Component from "@ember/component";

export default Component.extend({
  tagName: "input",
  type: "text",
  attributeBindings: [
    "value",
    "placeholder",
    "type",
    "inputId:id",
    "name",
    "autofocus",
    "autocomplete",

    "update:oninput",
    "setDirty:onblur"
  ]
});
