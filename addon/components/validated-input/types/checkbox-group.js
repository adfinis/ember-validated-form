import Component from "@ember/component";
import { action } from "@ember/object";

import layout from "../../../templates/components/validated-input/types/checkbox-group";

export default Component.extend({
  layout,

  @action
  onUpdate(key) {
    const value = this.value || [];
    const index = value.indexOf(key);

    if (index > -1) {
      value.splice(index, 1);
    } else {
      value.push(key);
    }

    this.update(value);
    this.setDirty();
  },
});
