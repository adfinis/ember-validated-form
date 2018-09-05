import Component from "@ember/component";
import layout from "../../templates/components/validated-button/button";

export default Component.extend({
  layout,
  tagName: "button",
  attributeBindings: ["disabled", "type", "action:onclick"]
});
