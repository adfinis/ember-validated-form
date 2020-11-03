import Component from "@ember/component";

export default Component.extend({
  tagName: "textarea",
  attributeBindings: [
    "value",
    "placeholder",
    "name",
    "inputId:id",
    "disabled",
    "autofocus",
    "rows",
    "cols",
    "autocomplete",

    "update:oninput",
    "setDirty:onblur",
  ],
});
