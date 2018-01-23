# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

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
- Removed automatic inference if field is required (which appended "*" to labels) because it
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
