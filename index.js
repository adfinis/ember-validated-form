"use strict";

module.exports = {
  name: require("./package").name,

  config() {
    const app = this._findHost(this);

    const appConfig = app.options["ember-validated-form"] ?? {};

    return {
      "ember-validated-form": {
        theme: "default",
        scrollErrorIntoView: false,
        ...appConfig,
      },
    };
  },
};
