# Migration to v6

## Config

`ember-validated-form` is heavily based on dynamic component invokation which
needed alot of changes in order to make it work with embroider. For the
consumers of the addon, the only thing that changes is the static configuration.

Since we switched from runtime configuration to build time configuration, the
current configuration of `ember-validated-form` needs to be moved from
`config/environment.js` to the `ember-cli-build.js` file:

**Before:**

```js
// config/environment.js
var ENV = {
  // ...
  "ember-validated-form": {
    theme: "bootstrap",
    features: {
      scrollErrorIntoView: true,
    },
    defaults: {
      error: "some-component",
      // ...
    },
  },
  // ...
};
```

**After:**

```js
// ember-cli-build.js
const app = new EmberAddon(defaults, {
  // ...
  "ember-validated-form": {
    theme: "bootstrap",
    features: {
      scrollErrorIntoView: true,
    },
    defaults: {
      error: "myapp/components/some-component",
      // ...
    },
  },
  // ...
});
```

As you can see above, the values in the section `defaults` changed as well.
Previously the value was just the name of the component used as default, since
v6 this needs to be an importable path (which allows static analysis).

## Removed deprecations

The `includeBlank` argument for validated inputs has been removed in favor of
`prompt`.
