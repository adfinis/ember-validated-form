# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.3.0]
### Changed
- Removed automatic inference if field is required (which appended "*" to labels) because it
was incorrect. Now, fields have to be marked as required explicitly:

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
