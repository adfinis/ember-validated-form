# ember-validated-form
[![npm version](https://badge.fury.io/js/ember-validated-form.svg)](https://badge.fury.io/js/ember-validated-form)
[![Ember Observer Score](http://emberobserver.com/badges/ember-validated-form.svg)](http://emberobserver.com/addons/ember-validated-form)
[![Build Status](https://travis-ci.org/adfinis-sygroup/ember-validated-form.svg?branch=master)](https://travis-ci.org/adfinis-sygroup/ember-validated-form)
[![Dependency status](https://david-dm.org/adfinis-sygroup/ember-validated-form.svg)](https://david-dm.org/adfinis-sygroup/ember-validated-form)

Easily create forms with client side validations.

## Demo

![gif](https://raw.githubusercontent.com/adfinis-sygroup/ember-validated-form/master/demo.gif)

Want to try it yourself? [See the live demo.](https://adfinis-sygroup.github.io/ember-validated-form/)

This [ember-cli](http://www.ember-cli.com) addon is based on the following excellent addons

- [ember-changeset](https://github.com/DockYard/ember-changeset)
- [ember-changeset-validations](https://github.com/DockYard/ember-changeset-validations/)
- [ember-one-way-select](https://github.com/DockYard/ember-one-way-select)

and provides a handy out-of-the-box setup for user-friendly client-side validations, featuring

- Hiding of validation errors until field has been interacted with (or submit button was pressed)
- Preventing submit action until form is valid
- Live-updating validation errors
- Bootstrap integration
- Loading class on submit button while async task is executed
- Loading contextual template parameter set while async submit task is executed

## Why *YAEFA?
**Yet another ember form addon*

There are many [existing ember addons](https://emberobserver.com/categories/forms) with this style of API, the most prominent probably being [ember-form-for](https://github.com/martndemus/ember-form-for). With this addon, we want to:

- focus on forms that require client-side validations
- provide good user experience out of the box

For more information, see this [blog post](https://www.adfinis-sygroup.ch/blog/en/form-validation-with-ember-js/).

## Usage

First, install the addon:
```
ember install ember-validated-form
```

This will also install `ember-changeset` and `ember-changeset-validations`. After, you'll need to set up

* a template containing your form elements
* a validations file (see [ember-changeset-validations](https://github.com/poteto/ember-changeset-validations))
* a controller, route and/or component that provides your template with the validations and your model

You'll find a basic example in [this twiddle](https://ember-twiddle.com/3691a8576c35ff149bfc26a564ec5437) or in the following code blocks:

```Handlebars
{{#validated-form
  model        = (changeset model UserValidations)
  on-submit    = (action "submit")
  as |f|}}

  {{f.input label="First name" name="firstName"}}
  {{f.input label="Last name" name="lastName"}}

  {{f.input type="textarea" label="About me" name="aboutMe"}}

  {{f.input
    type     = "select"
    label    = "Country"
    name     = "country"
    options  = countries
    value    = model.country
    }}

  {{f.input type="radioGroup" label="Gender" name="gender" options=genders}}

  {{#f.input label="Favorite Color" name="color" as |fi|}}
    {{favorite-colors-component colors=colors onupdate=fi.update onhover=fi.setDirty}}
  {{/f.input}}

  {{f.input type="checkbox" label="I agree with the terms and conditions" name="terms"}}

  {{f.submit label="Save"}}
{{/validated-form}}
```
```javascript
// controller
import Controller from '@ember/controller';
import UserValidations from 'dummy/validations/user';

export default Controller.extend({
  UserValidations,

  actions: {
    submit(model) {
      return model.save();
    }
  }
});
```
```javascript
// route
import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return { firstName: 'Max' } // or an ember object, an ember-data model, ...
  }
});
```
`UserValidations` is a changeset:
```javascript
// validations/user.js
import {
  validatePresence,
  validateLength,
  validateInclusion
} from 'ember-changeset-validations/validators';

export default {
  firstName: [validatePresence(true), validateLength({ min: 3, max: 40 })],
  lastName: [validatePresence(true), validateLength({ min: 3, max: 40 })],
  aboutMe: [validateLength({ allowBlank: true, max: 200 })],
  country: [validatePresence(true)],
  gender: [validatePresence(true)],
  terms: [
    validateInclusion({
      list: [true],
      message: 'Please accept the terms and conditions!'
    })
  ],
  color: [validatePresence(true)]
};
```

## Options

`{{validated-form}}` takes the following options:

| Name         | Type     | Description                                                                                                                                |
| ----         | ----     | -----------                                                                                                                                |
| model        | `Object` | ember-changeset containing the model that backs the form                                                                                   |
| validateBeforeSubmit | `Boolean` | Specifies whether to run validations on inputs before the form has been submitted. Defaults to true. |
| on-submit    | `Action` | Action, that is triggered on form submit. The changeset is passed as a parameter. If the action returns a promise, then any rendered submit buttons will have a customizable CSS class added and the yielded `loading` template parameter will be set. |
| autocomplete    | `String` | Binding to the [&lt;form&gt; `autocomplete` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-autocomplete). |

When the submission of your form can take a little longer and your users are of the impatient kind, it is often necessary to disable the submit button to prevent the form from being submitted multiple times. This can be done by using the `loading` template parameter:

```javascript
// controller
import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    submit(model) {
      return model.save().then(() => {
        // ... more code to show success messages etc.
      });
    }
  }
});
```
```Handlebars
{{#validated-form
  ...
  on-submit = (action "submit")
  as |f|}}
  ...
  {{f.submit label="Save" disabled=f.loading}}
{{/validated-form}}
```

It also works very well with [ember-concurrency](http://ember-concurrency.com/) tasks:

```javascript
// controller
import Controller from '@ember/controller';
import { task } from 'ember-concurrency';

export default Controller.extend({
  submit: task(function * (model) {
    yield model.save();
    // ... more code to show success messages etc.
  })
});
```
```Handlebars
{{#validated-form
  ...
  on-submit = (perform submit)
  as |f|}}
  ...
  {{f.submit label="Save" disabled=f.loading}}
{{/validated-form}}
```
For a minimal demo see [this twiddle](https://ember-twiddle.com/3547207b06ed896f123332dd772503d0).

## Input fields

`{{validated-form}}` yields an object, that contains the [contextual component](http://emberjs.com/blog/2016/01/15/ember-2-3-released.html#toc_contextual-components) `input`. All input fields share some common properties:

| Name  | Type     | Description                                                                |
| ----  | ----     | -----------                                                                |
| label | `String` | The label of the form field.                                               |
| name  | `String` | This is is the name of the model property this input is bound to.          |
| hint  | `String` | Additional explanatory text displayed below the input field.               |
| type  | `String` | Type of the form field (see supported field types below). Default: `text`. |
| disabled  | `Boolean` | Specifies if the input field is disabled. |
| required  | `Boolean` | If true, a "*" is appended to the field's label indicating that it is required. |
| value | `String` | Initial value of the form field. Default: model property defined by name. |
| validateBeforeSubmit | `Boolean` | Specifies whether to run validations on this input before the form has been submitted. Defaults to the value set on the form. |
| on-update | `Action` | Per default, the input elements are two-way-bound. If you want to implement custom update behavior, pass an action as `on-update`. The function receives two arguments: `update(value, changeset)`. |
| autocomplete | `String` | Binding to the [&lt;input&gt; autocomplete attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-autocomplete). |


The supported field types are "checkbox", "radioGroup", "select", "textarea" and any type that can
be specified on an <input> element. This addon does not much more than translating `{{f.input type="select"}}` to `{{one-way-select}}` or `{{f.input type="text"}}` to `<input type="text">` with the various other
properties (`name`, `disabled`, etc.) and event handlers.

However, some field types require extra parameters. The supported field types are listed below.

### Text input

If no field type is specified, a simple `<input type="text">` is rendered. Other HTML5 text-like inputs like `email`, `number`, `search` require specifying their type. The element also supports the following options:

- `placeholder`
- `autofocus`

```Handlebars
{{f.input label="First name" name="firstName"}}
{{f.input type="email" label="Email" name="email"}}
```

### Textarea

The textarea element also supports the following options:

- `rows` and `cols`
- `autofocus`
- `placeholder`

```Handlebars
{{f.input type="textarea" label="Description" name="description"}}
```

### Select

The select element supports more options (see [{{one-way-select}}](https://github.com/DockYard/ember-one-way-select)):

- `value`
- `options`
- `optionLabelPath`
- `optionValuePath`
- `optionTargetPath`
- `includeBlank`
- `promptIsSelectable`

The `prompt` property is currently not supported (see this [related issue](https://github.com/DockYard/ember-one-way-controls/issues/152)).

```Handlebars
{{f.input
  type    = "select"
  label   = "Country"
  name    = "country"
  options = countries
  prompt  = "Please choose..."
  promptIsSelectable = true
  }}
```

### Checkbox

This component renders an `<input type="checkbox">` elements.

```Handlebars
{{f.input type="checkbox" label="I agree with the terms and conditions" name="terms"}}
```

### Radio button group

This component renders a list of `<input type="radio">` elements.

```Handlebars
{{f.input type="radioGroup" label="Shapes" name="shapes" options=shapes}}
```

```javascript
// in your controller
shapes: [{
  key: 't',
  label: 'Triangle'
}, {
  key: 's',
  label: 'Square'
}, {
  key: 'c',
  label: 'Circle'
}],
```

If you want to customize the markup for each radio-button's label, you can invoke this component using block form. This is helpful if you need to localize your labels using something like [ember-i18n](https://github.com/jamesarosen/ember-i18n).

```Handlebars
{{#f.input type="radioGroup" label=(t 'some.scope.shapes') name="shapes" options=shapes}}
  {{t option.label}}
{{/f.input}}
```

```javascript
// in your controller
shapes: [{
  key: 't',
  label: 'some.scope.triangle'
}, {
  key: 's',
  label: 'some.scope.square'
}, {
  key: 'c',
  label: 'some.scope.circle'
}],
```

```javascript
// in your locale file
export default {
  'some': {
    'scope': {
      'shapes': 'les formes',
      'triangle': 'un triangle',
      'square': 'un carré',
      'circle': 'un cercle'
    }
  }
};
```


### Custom input elements

If the input element you need is not explicitly supported, you can easily integrate it with this addon by using `f.input` in block form:

```Handlebars
{{!-- ember-power-select --}}
{{#f.input name='example' as |fi|}}
  {{#power-select options=options selected=fi.value onchange=fi.update onblur=fi.setDirty as |name|}}
    {{name}}
  {{/power-select}}
{{/f.input}}

{{!-- homemade component --}}
{{#f.input label="Favorite Color" name="color" as |fi|}}
  {{favorite-colors-component selected=fi.value colors=colors onupdate=fi.update onhover=fi.setDirty}}
{{/f.input}}
```

There are three integration points for custom components:

* initialize the state of your component with `fi.value`
* update the model's value with `fi.update`
* mark your component as dirty with `fi.setDirty`

## Buttons

`{{validated-form}}` also yields a submit button component that can be accessed with `{{f.submit}}`. You can also use it as a block style component `{{#f.submit}}Test{{/f.submit}}` if you don't want to pass the label as a property. It takes the following properties:

| Name      | Type      | Description                                                                               |
| ----      | ----      | -----------                                                                               |
| label     | `String`  | The label of the form button.                                                             |
| type      | `String`  | Type of the button. Default: `button`.                                                    |
| disabled  | `Boolean` | Specifies if the button is disabled.                                                      |
| loading   | `Boolean` | Specifies if the button is loading. Default: Automatic integration of `ember-concurrency` |

## Config

Currently, the configuration supports

- `label.submit`: default label for the `submit` button. If you're using [ember-i18n](https://github.com/jamesarosen/ember-i18n), you can also specify a translation key.
- `css`: Custom CSS Classes
  - `form`
  - `group` (`div` wrapping every form element including label and validation messages)
  - `control` (applied to form elements like `input`, `select`, ...)
  - `label`
  - `radio` (`div` wrapping radio button groups)
  - `checkbox` (`div` wrapping checkboxes)
  - `help` (`span` containing validation messages)
  - `hint` (`p` containing form input hints)
  - `button`
  - `submit` (Special styling for the submit button, overrides `button`)
  - `error` (Name of the class added to `group` when the element is invalid)
  - `valid` (Name of the class added to `group` when the element is valid)
  - `loading` (Name of the class added to `button` when the element is loading)

See an example integration of Bootstrap and Semantic UI below.

### Bootstrap

```javascript
// environment.js

var ENV = {
  // ...
  'ember-validated-form': {
    label: {
      submit: 'Go for it!',
    },
    css: {
      // bootstrap classes
      group: 'form-group',
      control: 'form-control',
      label: 'form-label',
      checkbox: 'checkbox',
      radio: 'radio',
      help: 'help-block',
      hint: 'help-block',
      button: 'btn btn-default',
      submit: 'btn btn-primary'
    }
  },
  // ...
}
```

### Semantic UI

```javascript
// environment.js

var ENV = {
  // ...
  'ember-validated-form': {
    label: {
      submit: 'Go for it!',
    },
    css: {
      // semantic ui classes
      form: 'ui form',
      radio: 'ui radio',
      help: 'ui red',
      checkbox: 'ui checkbox',
      button: 'ui button',
      group: 'field',
      error: 'error'
    }
  },
  // ...
}
```

# Contributing

Bug reports, suggestions and pull requests are always welcome!

###  Installation

* `git clone https://github.com/adfinis-sygroup/ember-validated-form`
* `cd ember-validated-form`
* `yarn install`

### Linting

* `yarn lint:js`
* `yarn lint:js -- --fix`

### Running tests

* `yarn test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Running

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

### License

This project is licensed under the [MIT License](LICENSE.md).
