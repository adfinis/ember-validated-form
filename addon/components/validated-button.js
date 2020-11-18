import Component from "@ember/component";

import themedComponent from "../-private/themed-component";
import layout from "../templates/components/validated-button";

export default Component.extend({
  layout,
  type: "button",
  tagName: "",
  buttonComponent: themedComponent("validated-button/button"),
});
