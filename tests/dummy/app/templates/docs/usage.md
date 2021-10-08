# Usage

First, install the addon:

```bash
$ ember install ember-validated-form
```

This will also install `ember-changeset` and `ember-changeset-validations`.
After, you'll need to set up

- a template containing your form elements
- a validations file (see [ember-changeset-validations](https://github.com/poteto/ember-changeset-validations))
- a controller, route and/or component that provides your template with the validations and your model
