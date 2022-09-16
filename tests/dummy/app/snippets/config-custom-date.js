const app = new EmberAddon(defaults, {
  // ...
  "ember-validated-form": {
    defaults: {
      "types/date": "myapp/components/flatpickr-wrapper",
    },
  },
  // ...
});
