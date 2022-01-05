import { action } from "@ember/object";
import { deprecate } from '@ember/debug';
import Component from "@glimmer/component";

export default class SelectComponent extends Component {

  constructor(...args) {
    super(...args);

    if (this.args.includeBlank) {
      deprecate("The `includeBlank` property is deprecated. Please use `prompt` instead.",
      false,
      {
        id: "ember-validated-form:NoMoreincludeBlank",
        until: "6.0.0",
        since: "5.1.0",
        url: "https://github.com/adfinis-sygroup/ember-validated-form/releases/tag/v5.1.0"
      })
    }
  }

  @action
  onUpdate(event) {
    if (this.args.update) {
      this.args.update(event.target.value);
    }
  }

  @action
  onBlur(event) {
    if (this.args.setDirty) {
      this.args.setDirty(event.target.value);
    }
  }
}
