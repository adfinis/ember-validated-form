const app = new EmberAddon(defaults, {
  // ...
  "ember-validated-form": {
    defaults: {
      error: "myapp/components/x-my-error",
      hint: "myapp/components/x-my-hint",
      label: "myapp/components/x-my-label",
      render: "myapp/components/x-my-render",

      // button
      button: "myapp/components/x-my-button",

      // types
      "types/checkbox": "myapp/components/x-my-checkbox",
      "types/input": "myapp/components/x-my-input",
      "types/radio-group": "myapp/components/x-my-radio-group",
      "types/select": "myapp/components/x-my-select",
      "types/textarea": "myapp/components/x-my-textarea",
      "types/date": "myapp/components/x-my-date-picker",
    },
  },
  // ...
});
