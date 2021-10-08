import Component from "@glimmer/component";

import themedComponent from "../../-private/themed-component";

export default class RenderComponent extends Component {
  @themedComponent("validated-input/types/input") inputComponent;
  @themedComponent("validated-input/types/textarea") textareaComponent;
  @themedComponent("validated-input/types/checkbox") checkboxComponent;
  @themedComponent("validated-input/types/radio-group") radioGroupComponent;
  @themedComponent("validated-input/types/checkbox-group")
  checkboxGroupComponent;
  @themedComponent("validated-input/types/select") selectComponent;
}
