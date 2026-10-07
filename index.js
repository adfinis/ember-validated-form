"use strict";

module.exports = {
  name: require("./package").name,

  config() {
    // No host outside a build, e.g. `ember test --path dist`: the prebuilt
    // app already carries its config, so there are no options to merge.
    const app = this._findHost(this);

    const appConfig = app?.options?.["ember-validated-form"] ?? {};

    return {
      "ember-validated-form": {
        theme: "default",
        scrollErrorIntoView: false,
        ...appConfig,
      },
    };
  },
};
