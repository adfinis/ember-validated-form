import { getOwner } from "@ember/application";
import Helper from "@ember/component/helper";

export default class EVFThemeHelper extends Helper {
  get currentTheme() {
    return getOwner(this).resolveRegistration("config:environment")[
      "ember-validated-form"
    ].theme;
  }

  compute([expectedTheme]) {
    return this.currentTheme === expectedTheme;
  }
}
