# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

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
