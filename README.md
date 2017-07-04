# ember-validated-form
[![npm version](https://badge.fury.io/js/ember-validated-form.svg)](https://badge.fury.io/js/ember-validated-form)
[![Ember Observer Score](http://emberobserver.com/badges/ember-validated-form.svg)](http://emberobserver.com/addons/ember-validated-form)
[![Build Status](https://travis-ci.org/adfinis-sygroup/ember-validated-form.svg?branch=master)](https://travis-ci.org/adfinis-sygroup/ember-validated-form)
[![Dependency status](https://david-dm.org/adfinis-sygroup/ember-validated-form.svg)](https://david-dm.org/adfinis-sygroup/ember-validated-form)

Easily create forms with client side validations.

## Financeit-specific details

* changes should be made on feature branches named according to Financeit guidelines (i.e. `FIP-94592-fix-dropdowns`)
* changes should be merged into `dev`
* during development, Fit package.json files can be pointed to `dev` (i.e. `[URL]#dev`)
* for production deployment:
  ** issue a semantically-versioned release off of `dev`
  ** Fit package.json files should be pointed to this specific release (i.e. `[URL]#v0.5.2`)
* `master` should be kept in sync with upstream changes to the project, and used as a base for pull requests back to the project

## Demo

![gif](https://raw.githubusercontent.com/adfinis-sygroup/ember-validated-form/master/demo.gif)

Want to try it yourself? [See the live demo.](https://adfinis-sygroup.github.io/ember-validated-form/)

This [ember-cli](http://www.ember-cli.com) addon is based on the following excellent addons

- [ember-changeset](https://github.com/DockYard/ember-changeset)
- [ember-changeset-validations](https://github.com/DockYard/ember-changeset-validations/)
- [ember-one-way-controls](https://github.com/DockYard/ember-one-way-controls)

and provides a handy out-of-the-box setup for user-friendly client-side validations, featuring

- Hiding of validation errors until field has been interacted with (or submit button was pressed)
- Preventing submit action until form is valid
- Live-updating validation errors
- Bootstrap integration
- Disabled submit button while async task is executed

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

Basic example:

```Handlebars
{{#validated-form
  model        = (changeset model UserValidations)
  on-submit    = (action "submit")
  submit-label = 'Save' as |f|}}

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

where `UserValidations` is a changeset:

```javascript
// controller
import Ember from 'ember';
import UserValidations from 'dummy/validations/user';

export default Ember.Controller.extend({
  UserValidations
});
```

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
| on-submit    | `Action|Task` | Action or Task, that is triggered on form submit. The changeset is passed as a parameter. If specified, a submit button is rendered automatically. If a task is specified, the button will be disabled until it is finished (see example below). |

When the submission of your form can take a little longer and your users are of the impatient kind, it is often necessary to disable the submit button to prevent the form from being submitted multiple times.
All you have to do to achieve this is install [ember-concurrency](http://ember-concurrency.com/)

```
ember install ember-concurrency
```

and pass an ember-concurrency task instead of an action. Example:

```javascript
  // controller
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  submit: task(function * (model) {
    yield model.save();
    // ... more code to show success messages etc.
  })
});
```

## Input fields

`{{validated-form}}` yields an object, that contains the [contextual component](http://emberjs.com/blog/2016/01/15/ember-2-3-released.html#toc_contextual-components) `input`. All input fields share some common properties:

| Name  | Type     | Description                                                                |
| ----  | ----     | -----------                                                                |
| label | `String` | The label of the form field.                                               |
| name  | `String` | This is is the name of the model property this input is bound to.          |
| type  | `String` | Type of the form field (see supported field types below). Default: `text`. |
| disabled  | `Boolean` | Specifies if the input field is disabled. |
| required  | `Boolean` | If true, a "*" is appended to the field's label indicating that it is required. |
| value | `String` | Initial value of the form field. Default: model property defined by name. |
| on-update | `Action` | Per default, the input elements are two-way-bound. If you want to implement custom update behavior, pass an action as `on-update`. The function receives two arguments: `update(value, changeset)`. |


The supported field types are essentially given by [ember-one-way-controls](https://github.com/DockYard/ember-one-way-controls). This addon does not much more than translating `{{f.input type="select"}}` to `{{one-way-select}}`.

However, some field types require extra parameters. The supported field types are listed below.

### Text input

If no field type is specified, a simple `<input type="text">` is rendered. Other HTML5 text-like inputs like `email`, `number`, `search` require specifying their type. For more details see the docs of [{{one-way-input}}](https://github.com/DockYard/ember-one-way-controls/blob/master/docs/one-way-input.md).

```Handlebars
{{f.input label="First name" name="firstName"}}
{{f.input type="email" label="Email" name="email"}}
```

### Textarea

```Handlebars
{{f.input type="textarea" label="Description" name="description"}}
```

### Select

The select element requires more options (see [{{one-way-select}}](https://github.com/DockYard/ember-one-way-controls/blob/master/docs/one-way-select.md)):

- `value`
- `options`
- `optionLabelPath`
- `optionValuePath`
- `optionTargetPath`
- `includeBlank`

```Handlebars
{{f.input
  type         = "select"
  label        = "Country"
  name         = "country"
  options      = countries
  includeBlank = "Please choose..."
  }}
```

### Checkbox

This component renders a [{{one-way-checkbox}}](https://github.com/DockYard/ember-one-way-controls/blob/master/docs/one-way-checkbox.md).

```Handlebars
{{f.input type="checkbox" label="I agree with the terms and conditions" name="terms"}}
```

### Radio button group

This component renders a list of [{{one-way-radio}}](https://github.com/DockYard/ember-one-way-controls/blob/master/docs/one-way-radio.md) components.

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
{{#f.input label="Favorite Color" name="color" as |fi|}}
  {{favorite-colors-component colors=colors onupdate=fi.update onhover=fi.setDirty}}
{{/f.input}}
```
All you need to update the model's value or mark your component as dirty is to call `fi.update` or `fi.setDirty`.

## Buttons

`{{validated-form}}` also yields a submit button component that can be accessed with `{{f.submit}}`. It takes the following properties:

| Name      | Type      | Description                                                                                 |
| ----      | ----      | -----------                                                                                 |
| label     | `String`  | The label of the form button.                                                               |
| type      | `String`  | Type of the button. Default: `button`.                                                      |
| disabled  | `Boolean` | Specifies if the button is disabled. Default: Automatic integration of `ember-concurrency`. |

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
  - `help` (`span` containing help texts and validation messages)
  - `button`
  - `submit` (Special styling for the submit button, overrides `button`)
  - `error` (Name of the class added to `group` when the element is invalid)
  - `valid` (Name of the class added to `group` when the element is valid)

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

## Installation

* `git clone https://github.com/adfinis-sygroup/ember-validated-form`
* `cd ember-validated-form`
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
