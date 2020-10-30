import Component from "@ember/component";
import layout from "../templates/components/validated-button";
import themedComponent from "../-private/themed-component";

export default Component.extend({
  layout,
  type: "button",
  tagName: "",
  buttonComponent: themedComponent("validated-button/button"),
});
