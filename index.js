"use strict";

const defaultConfig = {
  theme: "default",
  scrollErrorIntoView: false,
};

module.exports = {
  name: require("./package").name,

  config() {
    const app = this._findHost(this);

    const appConfig = app.options["ember-validated-form"] ?? {};

    return {
      "ember-validated-form": { defaultConfig, ...appConfig },
    };
  },

  included(...args) {
    this._super.included.apply(this, ...args);

    const app = this._findHost(this);

    const { defaults = {} } = app.options["ember-validated-form"] ?? {};

    // Component defaults
    this.options["@embroider/macros"].setOwnConfig.error =
      defaults.error ?? "ember-validated-form/components/validated-input/error";
    this.options["@embroider/macros"].setOwnConfig.hint =
      defaults.hint ?? "ember-validated-form/components/validated-input/hint";
    this.options["@embroider/macros"].setOwnConfig.label =
      defaults.label ?? "ember-validated-form/components/validated-input/label";
    this.options["@embroider/macros"].setOwnConfig.render =
      defaults.render ??
      "ember-validated-form/components/validated-input/render";
    this.options["@embroider/macros"].setOwnConfig.button =
      defaults.button ??
      "ember-validated-form/components/validated-button/button";
    this.options["@embroider/macros"].setOwnConfig["types/checkbox-group"] =
      defaults["types/checkbox-group"] ??
      "ember-validated-form/components/validated-input/types/checkbox-group";
    this.options["@embroider/macros"].setOwnConfig["types/checkbox"] =
      defaults["types/checkbox"] ??
      "ember-validated-form/components/validated-input/types/checkbox";
    this.options["@embroider/macros"].setOwnConfig["types/input"] =
      defaults["types/input"] ??
      "ember-validated-form/components/validated-input/types/input";
    this.options["@embroider/macros"].setOwnConfig["types/radio-group"] =
      defaults["types/radio-group"] ??
      "ember-validated-form/components/validated-input/types/radio-group";
    this.options["@embroider/macros"].setOwnConfig["types/select"] =
      defaults["types/select"] ??
      "ember-validated-form/components/validated-input/types/select";
    this.options["@embroider/macros"].setOwnConfig["types/textarea"] =
      defaults["types/textarea"] ??
      "ember-validated-form/components/validated-input/types/textarea";
    this.options["@embroider/macros"].setOwnConfig["types/date"] =
      defaults["types/date"] ??
      "ember-validated-form/components/validated-input/types/input";
  },

  options: {
    "@embroider/macros": {
      setOwnConfig: {},
    },
  },
};
