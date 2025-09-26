# Migration to v8

## Global defaults

Before v8, `ember-validated-form` used `@embroider/macros`s `importSync` feature
to inject custom global components. This method proved to be very unreliable and
broke embroider support. In v8, we decided to drop this configuration in favor
of using the built-in override functionality provided by Ember.js.

Now, in order to globally override a component by `ember-validated-form`, simply
create a component with the same name (see <DocsLink
@route="docs.global-defaults">global defaults</DocsLink>).

**Before:**

```js
// ember-cli-build.js
const app = new EmberAddon(defaults, {
  // ...
  "ember-validated-form": {
    defaults: {
      error: "myapp/components/some-component",
      // ...
    },
  },
  // ...
});
```

**After:**

```hbs
{{! components/validated-input/error.hbs }}
<small>
  <strong>Error:</strong>
  {{this.errorString}}
</small>
```

```js
// components/validated-input/error.js
import ErrorComponent from "ember-validated-form/validated-input/error";

export default class extends ErrorComponent {}
```
