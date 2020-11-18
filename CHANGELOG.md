## [3.0.1](https://github.com/adfinis-sygroup/ember-validated-form/compare/v3.0.0...v3.0.1) (2020-11-18)


### Bug Fixes

* **deps:** update ember-changeset and validations to v3+ ([a9d83e2](https://github.com/adfinis-sygroup/ember-validated-form/commit/a9d83e208ad2599b0bd3847bc170179294d479ad))

# [3.0.0](https://github.com/adfinis-sygroup/ember-validated-form/compare/v2.0.0...v3.0.0) (2020-11-06)


* chore!: update dependencies (#392) ([2664399](https://github.com/adfinis-sygroup/ember-validated-form/commit/266439966050dee4ec6033f24828c84f5e0543b8)), closes [#392](https://github.com/adfinis-sygroup/ember-validated-form/issues/392)


### Bug Fixes

* **deps:** bump ember-auto-import from 1.6.0 to 1.7.0 ([#394](https://github.com/adfinis-sygroup/ember-validated-form/issues/394)) ([9d464e4](https://github.com/adfinis-sygroup/ember-validated-form/commit/9d464e4b5e83f19f3bd46897ef56a3caaaeb7153))
* **select:** pass promptIsSelectable to select ([e739b4f](https://github.com/adfinis-sygroup/ember-validated-form/commit/e739b4fea27165e97ae0130e5d330990bdf501ee))


### BREAKING CHANGES

* This drops support for Ember LTS 3.8 and 3.12

# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/)
and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.4.2]

### Changed

* Bump version because of a wrong npm publish

## [1.4.1]

### Changed

* Fix changing of a changeset property from outside of the form (#118)

## [1.4.0]

### Changed

* Update ember to version 3.1
* Fix mixed content in docs (#107 / #108, credits to @sliverc)
* Fix wrong bootstrap class in documentation (#114, credits to @kimroen)

### Added

* `on-invalid-submit` action gets called on submitting an invalid form (#111, credits to @omairvaiyani)
* `inputId` is yielded from the `validated-input` component (#115, credits to @kimroen)

## [1.3.1]

### Changed

* Addon docs with [`ember-cli-addon-docs`](https://github.com/ember-learn/ember-cli-addon-docs)

## [1.3.0]

### Changed

* Bootstrap 4 support (#100, credits to @anehx)
* Add valid and invalid class to input component (#100, credits to @anehx)
* Only set valid class if value is dirty (#100, credits to @anehx)

## [1.2.0]

### Changed

* Add support for custom label components (#95, credits to @przywartya)
* Allow setting autocomplete attribute on validated-form and validated-input (#97, credits to @makepanic)

## [1.1.0]

### Changed

* Update ember-cli to 3.0.0, update dependencies

## [1.0.1]

### Changed

* fix: use radio value to expose option key (#91, credits to @makepanic)

## [1.0.0]

### Changed

* Install `ember-changeset` and `ember-changeset-validations` from the blueprint (#86, credits to @bendemboski)
* Update dependencies (#87, credits to @bendemboski)
* Remove deprecated task support (#88, credits to @bendemboski)

The 1.0.0 release removes ember-changeset and ember-changeset-validations as dependencies because this addon is built to make them very easy to use, but doesn't require them. So if you are using either or both of them in your application code but do not already have them in your package.json, you should run

```bash
ember install ember-changeset
ember install ember-changeset-validations
```

This release also removes the previously deprecated API for passing ember-concourrency tasks to `on-submit`. Please see section [0.6.2] for migration instructions.

## [0.7.1]

### Changed

* Fix for removal from DOM during submit (#85, credits to @bendemboski)

## [0.7.0]

### Changed

* Wrap radio, checkbox in span to allow custom styles (#82, credits to @makepanic)

## [0.6.4]

### Changed

* Update ember truth helpers (#79, credits to @bendemboski)
* Update ember-cli to 2.18.0 (#80)

## [0.6.3]

### Changed

* Add disabled flag on checkbox instance (#77, credits to @toumbask)

## [0.6.2]

### Changed

* Yield loading state, change `on-submit` to promise semantics (#75, credits to @bendemboski)

This release deprecates passing an ember-concurrency task directly to `on-submit`:

```Handlebars
// deprecated:
{{#validated-form on-submit = myTask (...)}}
```

Instead, `on-submit` accepts a promise - which is returned by wrapping the task in `perform`:

```Handlebars
{{#validated-form on-submit = (perform myTask) (...)}}
```

## [0.6.1]

### Added

* Add more input attributes (#71, credits to @bendemboski)
* Add validateBeforeSubmit option (#70, credits to @bendemboski)

## [0.6.0]

### Changed

* Use yarn instead of npm (#62)
* Update dependencies (#62)
* Remove automatic disabling of submit button while task is running (#63)

To restore the old behaviour, all you have to do is pass the `isRunning` state as `disabled` property to the submit button:

```Handlebars
{{#validated-form
  ...
  on-submit = myTask
  as |f|}}
  {{f.submit label="Test" disabled=myTask.isRunning}}
{{/validated-form}}
```

### Added

* Add loading class to button if task is running (#63)
* Support block style usage of submit button (#61)

### Removed

* Useless class name binding on button (#65)
* Dependency to ember-data (#62)
* Various unused dependencies (#62)

## [0.5.4]

### Changed

* Input, Textarea: Use native input tag instead of one-way-input (#60)
* Dummy app: load bootstrap from CDN (#59)

## [0.5.3]

### Changed

* Fix bug that caused ID collisions when multiple forms on the same page use inputs with
  the same name (#55, credits to @anehx)

## [0.5.2]

### Changed

* Update ember-cli to v2.5.1 (#53)

## [0.5.1]

### Changed

* Add proper `id` attributes to select and simple form components (#51)

## [0.5.0]

### Changed

* Separate classes for field hints and validation messages (#42, credits to @jacob-financit). If you've
  been using the (previously undocumented) option `help` on input fields, you'll have to rename them to `hint`.

## [0.4.2]

### Added

* Better documentation for custom component integration (#46)

### Changed

* Fix bug that causes form to break for select fields without option `promptIsSelectable` (#45)

## [0.4.1]

### Added

* Support selectable prompts from the select dropdown (#40, credits to @steverhoades)

### Changed

* Update dependencies (#33, #34, credits to @okachynskyy)
* Move addon from pods to default structure (#32, credits to @okachynskyy)

## [0.4.0]

### Added

* Support block form usage of radioGroups (#28, credits to @jacob-financeit)

### Changed

* remove hardcoded `radio` class for radio button groups. If you're using bootstrap, you
  might have to add `radio: 'radio'` to the CSS config.

## [0.3.1]

### Added

* More CSS configuration options and docs on how to integrate semantic UI (#26)

## [0.3.0]

### Changed

* Removed automatic inference if field is required (which appended "\*" to labels) because it
  was incorrect. (#27, credits to @andreabettich) Now, fields have to be marked as required explicitly:

```Handlebars
{{f.input label="First name" name="firstName" required=true}}
```

## [0.2.2]

* Upgrade to ember 2.12.0 (#24, credits to @sproj)

## [0.2.1]

### Added

* Override initial value of input field using `value` attribute (#22, credits to @kaldras)
* Document `on-update` property for custom update functions of input elements,
  and add `changeset` argument to its signature

## [0.2.0]

### Changed

* yield `submit` button instead of automatically rendering it, removed `cancel` button. Migration is simple:

Before:

```Handlebars
{{#validated-form
  model        = (changeset model UserValidations)
  on-submit    = (action "submit")
  on-cancel    = (action "cancel")
  submit-label = 'Save' as |f|}}
  {{!-- form content --}}
{{/validated-form}}
```

After:

```Handlebars
{{#validated-form
  model        = (changeset model UserValidations)
  on-submit    = (action "submit")
  as |f|}}
  {{!-- form content --}}
  {{f.submit label='Save'}}
  <button {{action="cancel"}}>Cancel</button>
{{/validated-form}}
```

## [0.1.11] - 2017-03-23

### Added

* Checkbox support (#5, credits to @psteininger)

## [0.1.10] - 2017-03-23

### Added

* Easy integration of custom components (#17, credits to @feanor07)
