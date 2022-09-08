# [6.0.0](https://github.com/adfinis/ember-validated-form/compare/v5.3.1...v6.0.0) (2022-09-08)


### chore

* **deps:** update ember and drop node 12 support ([3f3fb67](https://github.com/adfinis/ember-validated-form/commit/3f3fb67e269b8e8e30f5939ccbbc58a01a2a6aa0))
* **select:** remove deprecated option includeBlank on selects ([3ef60b2](https://github.com/adfinis/ember-validated-form/commit/3ef60b21c1bc10259ab3865aacb5b3e2fdeda6bc))


### Features

* support embroider builds ([b0b0bde](https://github.com/adfinis/ember-validated-form/commit/b0b0bdea32a035fa499a9b0bae7ed245b4dd66f7))


### BREAKING CHANGES

* **select:** Remove deprecated option `includeBlank` on select
inputs.
* This changes the global configuration for features,
themes and default components completely. For instructions on how to
migrate, check the migration to v6 guide.
* **deps:** Drop support for Node v12 and Ember LTS 3.24

## [5.3.1](https://github.com/adfinis/ember-validated-form/compare/v5.3.0...v5.3.1) (2022-09-02)

### Bug Fixes

- **select:** fix promptIsSelectable in combination with targetPath ([#853](https://github.com/adfinis/ember-validated-form/issues/853)) ([526d81f](https://github.com/adfinis/ember-validated-form/commit/526d81f25eb47f938fa2fa031d5f5e710a0386bf))

# [5.3.0](https://github.com/adfinis/ember-validated-form/compare/v5.2.2...v5.3.0) (2022-02-22)

### Bug Fixes

- addon docs root url ([7d8151f](https://github.com/adfinis/ember-validated-form/commit/7d8151fa9d854cdf9595f27347fa57652e58ef10))
- **blueprint:** add ember-truth-helpers to default blueprint ([a401589](https://github.com/adfinis/ember-validated-form/commit/a401589dab6d013f5d659865927919346655295d))
- **deps:** move required deps to dependencies instead of devDependencies ([46629ce](https://github.com/adfinis/ember-validated-form/commit/46629ceb48210bbc58898c299a9388ce7fa816ec))
- new link to docs ([c1073e5](https://github.com/adfinis/ember-validated-form/commit/c1073e55e3a916ed393e33bcf4a045124c320967))
- **select:** pass prompt argument down to input component ([64a1377](https://github.com/adfinis/ember-validated-form/commit/64a1377d64618fa880b332f8a693e1c7f1a321f7))

### Features

- pass attributes to input components ([dc0417d](https://github.com/adfinis/ember-validated-form/commit/dc0417d125fe4c20cb59b76531ae4f7391258259))

## [5.2.2](https://github.com/adfinis/ember-validated-form/compare/v5.2.1...v5.2.2) (2022-02-10)

### Bug Fixes

- select support for plain options ([#747](https://github.com/adfinis/ember-validated-form/issues/747)) ([a58e26d](https://github.com/adfinis/ember-validated-form/commit/a58e26ddcd46ec5328c3bb5351bafc7781eacdbd))

## [5.2.1](https://github.com/adfinis/ember-validated-form/compare/v5.2.0...v5.2.1) (2022-02-09)

### Bug Fixes

- respect scrollErrorIntoView for validated buttons as well ([#743](https://github.com/adfinis/ember-validated-form/issues/743)) ([fd6be2a](https://github.com/adfinis/ember-validated-form/commit/fd6be2a49c5f947bfcf5eb3f7ab61a23ac00064a))

# [5.2.0](https://github.com/adfinis/ember-validated-form/compare/v5.1.1...v5.2.0) (2022-02-03)

### Features

- scroll first invalid element into view ([#733](https://github.com/adfinis/ember-validated-form/issues/733)) ([ae7c8b2](https://github.com/adfinis/ember-validated-form/commit/ae7c8b2b160307646adf90cd09a091effa549238))
- **validated-button:** add `triggerValidations` flag ([#721](https://github.com/adfinis/ember-validated-form/issues/721)) ([765f5f4](https://github.com/adfinis/ember-validated-form/commit/765f5f40c9d2e5ccfca7129fb701ff3bb0ed661e))

# [5.0.0](https://github.com/adfinis/ember-validated-form/compare/v4.1.0...v5.0.0) (2021-10-08)

### chore

- **deps:** update ember and other dependencies ([41e099c](https://github.com/adfinis/ember-validated-form/commit/41e099c4da82135c562493e5b2a4f9420dca73c6))
- **ember:** remove support for ember 3.20 ([0cfebfc](https://github.com/adfinis/ember-validated-form/commit/0cfebfcc5792a1df52093a972878af1617ec8100))

### Features

- refactor all components to glimmer and use native classes ([cee7373](https://github.com/adfinis/ember-validated-form/commit/cee7373a3c0783a02fe00b5e510c41ba604403c2))

### BREAKING CHANGES

- **ember:** Remove support for ember LTS 3.20 since that version
  has a bug with autotracking.
- **deps:** Require `ember-auto-import` v2+
- While the public API won't change, there is a huge
  chance that this will break implementations if someone's extending the
  components of this addon. Components that do need to be refactored to
  glimmer.

# [4.1.0](https://github.com/adfinis/ember-validated-form/compare/v4.0.1...v4.1.0) (2021-09-30)

### Bug Fixes

- **deps:** [security] bump handlebars from 4.7.6 to 4.7.7 ([#588](https://github.com/adfinis/ember-validated-form/issues/588)) ([d167207](https://github.com/adfinis/ember-validated-form/commit/d167207ee059bd9b968a08fb61f18f43dadab0ab))
- **deps:** [security] bump striptags from 3.1.1 to 3.2.0 ([#637](https://github.com/adfinis/ember-validated-form/issues/637)) ([3632f52](https://github.com/adfinis/ember-validated-form/commit/3632f52e7fa1fc6f0e17dd3365a74a80ceb92833))
- **deps:** [security] bump trim-newlines from 3.0.0 to 3.0.1 ([#634](https://github.com/adfinis/ember-validated-form/issues/634)) ([10e3974](https://github.com/adfinis/ember-validated-form/commit/10e397452b30a3af11a299c5bcdafd703d9b0c18))
- **deps:** [security] bump ws from 6.2.1 to 6.2.2 ([#624](https://github.com/adfinis/ember-validated-form/issues/624)) ([910ec64](https://github.com/adfinis/ember-validated-form/commit/910ec64b2f84562fd77a8be14094fd2f326d60b6))
- call on-update hook correctly ([#641](https://github.com/adfinis/ember-validated-form/issues/641)) ([b8688b6](https://github.com/adfinis/ember-validated-form/commit/b8688b6d9dedbd9096d34c3b236bf59efb045556))

### Features

- checkbox groups ([#640](https://github.com/adfinis/ember-validated-form/issues/640)) ([9099ce8](https://github.com/adfinis/ember-validated-form/commit/9099ce81bbedc53c961653dca59c555d96ee9128))

## [4.0.1](https://github.com/adfinis/ember-validated-form/compare/v4.0.0...v4.0.1) (2021-05-21)

### Bug Fixes

- **validated-input:** use changeset.set if available to preserve state tracking on nested objects ([#609](https://github.com/adfinis/ember-validated-form/issues/609)) ([d3b92ee](https://github.com/adfinis/ember-validated-form/commit/d3b92ee5dfb7e0a6f4fbdb1899d9be34b67d1722))

# [4.0.0](https://github.com/adfinis/ember-validated-form/compare/v3.0.3...v4.0.0) (2021-05-19)

### Bug Fixes

- **validated-input:** rewrite to glimmer and support nested changesets ([#581](https://github.com/adfinis/ember-validated-form/issues/581)) ([2f3e7c5](https://github.com/adfinis/ember-validated-form/commit/2f3e7c5c9e13ad39ecba9358305cfcc4bac8f6b8))

### BREAKING CHANGES

- **validated-input:** This drops support for Ember LTS 3.16 and `ember-changeset` < 3.0.0 and `ember-changeset-validations` < 3.0.0

- refactor(validated-input): refactor dynamic component call to angle-brackets

- chore(\*): drop node v10 support
- **validated-input:** drop node v10 support since v10 has reached EOL

- fix(themed-component): convert array to string befor using in key path

## [3.0.3](https://github.com/adfinis/ember-validated-form/compare/v3.0.2...v3.0.3) (2021-04-15)

### Bug Fixes

- **deps:** [security] bump elliptic from 6.5.3 to 6.5.4 ([#538](https://github.com/adfinis/ember-validated-form/issues/538)) ([b36030c](https://github.com/adfinis/ember-validated-form/commit/b36030cd289485154fbaaefe914535cad7639043))
- **deps:** [security] bump ini from 1.3.5 to 1.3.8 ([#450](https://github.com/adfinis/ember-validated-form/issues/450)) ([97870d1](https://github.com/adfinis/ember-validated-form/commit/97870d152b12a273328fae257fb7399a067d7f9c))
- **deps:** [security] bump socket.io from 2.3.0 to 2.4.1 ([#474](https://github.com/adfinis/ember-validated-form/issues/474)) ([fe46f19](https://github.com/adfinis/ember-validated-form/commit/fe46f197439ff85170c92b6236f73c34f459d01f))
- **deps:** [security] bump y18n from 3.2.1 to 3.2.2 ([#560](https://github.com/adfinis/ember-validated-form/issues/560)) ([727144e](https://github.com/adfinis/ember-validated-form/commit/727144edc1920d323aee882240de695ca5f0e228))
- remove unused modules which lead to invalid imports ([#464](https://github.com/adfinis/ember-validated-form/issues/464)) ([d0405bf](https://github.com/adfinis/ember-validated-form/commit/d0405bf8733119394c953f73155349f65e2e5a88))
- **deps:** bump ember-auto-import from 1.10.1 to 1.11.2 ([#557](https://github.com/adfinis/ember-validated-form/issues/557)) ([f01f882](https://github.com/adfinis/ember-validated-form/commit/f01f8826fe6cddfa1d5776960fb773973a25545d))
- **deps:** bump ember-auto-import from 1.7.0 to 1.10.1 ([#456](https://github.com/adfinis/ember-validated-form/issues/456)) ([d4940d7](https://github.com/adfinis/ember-validated-form/commit/d4940d7cf6a367184dccd0e6677f3bdae6afdee8))
- **deps:** bump ember-cli-babel from 7.23.0 to 7.23.1 ([#473](https://github.com/adfinis/ember-validated-form/issues/473)) ([df7cec0](https://github.com/adfinis/ember-validated-form/commit/df7cec06c35b0665df6e177f495360a14572cb73))
- **deps:** bump ember-cli-babel from 7.23.1 to 7.26.3 ([#558](https://github.com/adfinis/ember-validated-form/issues/558)) ([6b0ee99](https://github.com/adfinis/ember-validated-form/commit/6b0ee99faf936d329378959c63303a18fd855912))
- **deps:** bump ember-cli-htmlbars from 5.6.4 to 5.7.1 ([#549](https://github.com/adfinis/ember-validated-form/issues/549)) ([e00e417](https://github.com/adfinis/ember-validated-form/commit/e00e41791039ce1b410f442900b8f079a42cae4d))
- **deps:** bump ember-one-way-select from 4.0.0 to 4.0.1 ([#565](https://github.com/adfinis/ember-validated-form/issues/565)) ([0564346](https://github.com/adfinis/ember-validated-form/commit/05643467b6edffc6e08eb067f77acdd79161ae5b))
- **deps:** bump uuid from 8.3.1 to 8.3.2 ([#439](https://github.com/adfinis/ember-validated-form/issues/439)) ([d72f013](https://github.com/adfinis/ember-validated-form/commit/d72f0130f5b34cda2bda3b82da5204403d026541))

## [3.0.2](https://github.com/adfinis/ember-validated-form/compare/v3.0.1...v3.0.2) (2020-11-20)

### Bug Fixes

- **intl:** remove unused translation that caused warnings in apps ([f20f233](https://github.com/adfinis/ember-validated-form/commit/f20f2332cbf8cf70711f292864e7a9dd2df8b995))

## [3.0.1](https://github.com/adfinis/ember-validated-form/compare/v3.0.0...v3.0.1) (2020-11-18)

### Bug Fixes

- **deps:** update ember-changeset and validations to v3+ ([a9d83e2](https://github.com/adfinis/ember-validated-form/commit/a9d83e208ad2599b0bd3847bc170179294d479ad))

# [3.0.0](https://github.com/adfinis/ember-validated-form/compare/v2.0.0...v3.0.0) (2020-11-06)

- chore!: update dependencies (#392) ([2664399](https://github.com/adfinis/ember-validated-form/commit/266439966050dee4ec6033f24828c84f5e0543b8)), closes [#392](https://github.com/adfinis/ember-validated-form/issues/392)

### Bug Fixes

- **deps:** bump ember-auto-import from 1.6.0 to 1.7.0 ([#394](https://github.com/adfinis/ember-validated-form/issues/394)) ([9d464e4](https://github.com/adfinis/ember-validated-form/commit/9d464e4b5e83f19f3bd46897ef56a3caaaeb7153))
- **select:** pass promptIsSelectable to select ([e739b4f](https://github.com/adfinis/ember-validated-form/commit/e739b4fea27165e97ae0130e5d330990bdf501ee))

### BREAKING CHANGES

- This drops support for Ember LTS 3.8 and 3.12

# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/)
and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.4.2]

### Changed

- Bump version because of a wrong npm publish

## [1.4.1]

### Changed

- Fix changing of a changeset property from outside of the form (#118)

## [1.4.0]

### Changed

- Update ember to version 3.1
- Fix mixed content in docs (#107 / #108, credits to @sliverc)
- Fix wrong bootstrap class in documentation (#114, credits to @kimroen)

### Added

- `on-invalid-submit` action gets called on submitting an invalid form (#111, credits to @omairvaiyani)
- `inputId` is yielded from the `validated-input` component (#115, credits to @kimroen)

## [1.3.1]

### Changed

- Addon docs with [`ember-cli-addon-docs`](https://github.com/ember-learn/ember-cli-addon-docs)

## [1.3.0]

### Changed

- Bootstrap 4 support (#100, credits to @anehx)
- Add valid and invalid class to input component (#100, credits to @anehx)
- Only set valid class if value is dirty (#100, credits to @anehx)

## [1.2.0]

### Changed

- Add support for custom label components (#95, credits to @przywartya)
- Allow setting autocomplete attribute on validated-form and validated-input (#97, credits to @makepanic)

## [1.1.0]

### Changed

- Update ember-cli to 3.0.0, update dependencies

## [1.0.1]

### Changed

- fix: use radio value to expose option key (#91, credits to @makepanic)

## [1.0.0]

### Changed

- Install `ember-changeset` and `ember-changeset-validations` from the blueprint (#86, credits to @bendemboski)
- Update dependencies (#87, credits to @bendemboski)
- Remove deprecated task support (#88, credits to @bendemboski)

The 1.0.0 release removes ember-changeset and ember-changeset-validations as dependencies because this addon is built to make them very easy to use, but doesn't require them. So if you are using either or both of them in your application code but do not already have them in your package.json, you should run

```bash
ember install ember-changeset
ember install ember-changeset-validations
```

This release also removes the previously deprecated API for passing ember-concourrency tasks to `on-submit`. Please see section [0.6.2] for migration instructions.

## [0.7.1]

### Changed

- Fix for removal from DOM during submit (#85, credits to @bendemboski)

## [0.7.0]

### Changed

- Wrap radio, checkbox in span to allow custom styles (#82, credits to @makepanic)

## [0.6.4]

### Changed

- Update ember truth helpers (#79, credits to @bendemboski)
- Update ember-cli to 2.18.0 (#80)

## [0.6.3]

### Changed

- Add disabled flag on checkbox instance (#77, credits to @toumbask)

## [0.6.2]

### Changed

- Yield loading state, change `on-submit` to promise semantics (#75, credits to @bendemboski)

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

- Add more input attributes (#71, credits to @bendemboski)
- Add validateBeforeSubmit option (#70, credits to @bendemboski)

## [0.6.0]

### Changed

- Use yarn instead of npm (#62)
- Update dependencies (#62)
- Remove automatic disabling of submit button while task is running (#63)

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

- Add loading class to button if task is running (#63)
- Support block style usage of submit button (#61)

### Removed

- Useless class name binding on button (#65)
- Dependency to ember-data (#62)
- Various unused dependencies (#62)

## [0.5.4]

### Changed

- Input, Textarea: Use native input tag instead of one-way-input (#60)
- Dummy app: load bootstrap from CDN (#59)

## [0.5.3]

### Changed

- Fix bug that caused ID collisions when multiple forms on the same page use inputs with
  the same name (#55, credits to @anehx)

## [0.5.2]

### Changed

- Update ember-cli to v2.5.1 (#53)

## [0.5.1]

### Changed

- Add proper `id` attributes to select and simple form components (#51)

## [0.5.0]

### Changed

- Separate classes for field hints and validation messages (#42, credits to @jacob-financit). If you've
  been using the (previously undocumented) option `help` on input fields, you'll have to rename them to `hint`.

## [0.4.2]

### Added

- Better documentation for custom component integration (#46)

### Changed

- Fix bug that causes form to break for select fields without option `promptIsSelectable` (#45)

## [0.4.1]

### Added

- Support selectable prompts from the select dropdown (#40, credits to @steverhoades)

### Changed

- Update dependencies (#33, #34, credits to @okachynskyy)
- Move addon from pods to default structure (#32, credits to @okachynskyy)

## [0.4.0]

### Added

- Support block form usage of radioGroups (#28, credits to @jacob-financeit)

### Changed

- remove hardcoded `radio` class for radio button groups. If you're using bootstrap, you
  might have to add `radio: 'radio'` to the CSS config.

## [0.3.1]

### Added

- More CSS configuration options and docs on how to integrate semantic UI (#26)

## [0.3.0]

### Changed

- Removed automatic inference if field is required (which appended "\*" to labels) because it
  was incorrect. (#27, credits to @andreabettich) Now, fields have to be marked as required explicitly:

```Handlebars
{{f.input label="First name" name="firstName" required=true}}
```

## [0.2.2]

- Upgrade to ember 2.12.0 (#24, credits to @sproj)

## [0.2.1]

### Added

- Override initial value of input field using `value` attribute (#22, credits to @kaldras)
- Document `on-update` property for custom update functions of input elements,
  and add `changeset` argument to its signature

## [0.2.0]

### Changed

- yield `submit` button instead of automatically rendering it, removed `cancel` button. Migration is simple:

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

- Checkbox support (#5, credits to @psteininger)

## [0.1.10] - 2017-03-23

### Added

- Easy integration of custom components (#17, credits to @feanor07)
