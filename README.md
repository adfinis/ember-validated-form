[![npm version](https://badge.fury.io/js/ember-validated-form.svg)](https://badge.fury.io/js/ember-validated-form)
[![Ember Observer Score](http://emberobserver.com/badges/ember-validated-form.svg)](http://emberobserver.com/addons/ember-validated-form)
[![Build Status](https://travis-ci.org/adfinis-sygroup/ember-validated-form.svg?branch=master)](https://travis-ci.org/adfinis-sygroup/ember-validated-form)

# ember-validated-form

Easily create forms with client side validations!

This [ember-cli](http://www.ember-cli.com) addon is based on the following excellent addons:

- ember-changeset
- ember-changeset-validations
- ember-one-way-controls

## Usage

First, install the addon:
```
ember install ember-validated-form
```

Basic example:

```
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
    selected = model.country
    }}

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
  validateLength
} from 'ember-changeset-validations/validators';


export default {
  firstName: [
    validatePresence(true),
    validateLength({min: 3, max: 40})
  ],
  lastName: [
    validatePresence(true),
    validateLength({min: 3, max: 40})
  ],
  aboutMe: [
    validateLength({allowBlank: true, max: 200})
  ]
};
```

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
