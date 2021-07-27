import Component from "@ember/component";

import themedComponent from "../../-private/themed-component";
import layout from "../../templates/components/validated-input/render";

export default Component.extend({
  layout,
  selectComponent: themedComponent("validated-input/types/select"),
  radioGroupComponent: themedComponent("validated-input/types/radio-group"),
  checkboxGroupComponent: themedComponent(
    "validated-input/types/checkbox-group"
  ),
  checkboxComponent: themedComponent("validated-input/types/checkbox"),
  textareaComponent: themedComponent("validated-input/types/textarea"),
  inputComponent: themedComponent("validated-input/types/input"),
});
