import Component from "@ember/component";
import { computed } from "@ember/object";
import layout from "../templates/components/validated-label";

/**
 * This component generates default labels.
 *
 * It will be used when label parameter is specified.
 * {{validated-input label="Name default"}} (Will render label next to input field.)
 *
 * or it is possible to override it with a custom component:
 * {{validated-input label="Name custom"
 *   labelComponent=(component "some-custom-component"  customComponentParam="Custom text for custom component.")}}
 */
export default Component.extend({
  layout,

  tagName: "label",

  attributeBindings: ["inputId:for"],

  classNameBindings: ["config.css.label"],

  requiredLabel: computed("config", function() {
    return this.get("config.label.required") || "*";
  })
});
