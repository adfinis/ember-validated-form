"use strict";

const assert = require("node:assert/strict");
const { test } = require("node:test");

const addon = require("../index");

function configWithHost(host) {
  return addon.config.call({ ...addon, _findHost: () => host });
}

test("config falls back to the defaults without a host app", () => {
  assert.deepEqual(configWithHost(undefined), {
    "ember-validated-form": { theme: "default", scrollErrorIntoView: false },
  });
});

test("config merges the host app's options over the defaults", () => {
  const host = { options: { "ember-validated-form": { theme: "bootstrap" } } };

  assert.deepEqual(configWithHost(host), {
    "ember-validated-form": { theme: "bootstrap", scrollErrorIntoView: false },
  });
});
