# Introduction

This [ember-cli](http://www.ember-cli.com) addon is based on the following
excellent addons

- [ember-changeset](https://github.com/DockYard/ember-changeset)
- [ember-changeset-validations](https://github.com/DockYard/ember-changeset-validations/)

and provides a handy out-of-the-box setup for user-friendly client-side
validations, featuring

- Hiding of validation errors until field has been interacted with (or submit button was pressed)
- Preventing submit action until form is valid
- Live-updating validation errors
- Bootstrap integration
- Loading class on submit button while async task is executed
- Loading contextual template parameter set while async submit task is executed

## Why \*YAEFA?

\*_Yet another ember form addon_

There are many [existing ember
addons](https://emberobserver.com/categories/forms) with this style of API,
the most prominent probably being
[ember-form-for](https://github.com/martndemus/ember-form-for). With this
addon, we want to:

- focus on forms that require client-side validations
- provide good user experience out of the box

For more information, see this [blog
post](https://adfinis.com/en/blog/form-validation-with-ember-js/).
