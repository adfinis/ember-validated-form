import Component from "@glimmer/component";

import passedOrDefault from "ember-validated-form/passed-or-default";

export default class RenderComponent extends Component {
  @passedOrDefault("types/checkbox-group") checkboxGroupComponent;
  @passedOrDefault("types/checkbox") checkboxComponent;
  @passedOrDefault("types/input") inputComponent;
  @passedOrDefault("types/radio-group") radioGroupComponent;
  @passedOrDefault("types/select") selectComponent;
  @passedOrDefault("types/textarea") textareaComponent;
  @passedOrDefault("types/date") dateComponent;
}
