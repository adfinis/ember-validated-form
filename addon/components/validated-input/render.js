import Component from "@ember/component";
import layout from "../../templates/components/validated-input/render";
import themedComponent from "../../-private/themed-component";

export default Component.extend({
  layout,
  selectComponent: themedComponent("validated-input/-types/select"),
  radioGroupComponent: themedComponent("validated-input/-types/radio-group"),
  checkboxComponent: themedComponent("validated-input/-types/checkbox"),
  textareaComponent: themedComponent("validated-input/-types/textarea"),
  inputComponent: themedComponent("validated-input/-types/input")
});
