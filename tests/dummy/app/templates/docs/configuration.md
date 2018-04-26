# Configuration

Currently, the configuration supports

* `label.submit`: default label for the `submit` button. If you"re using [ember-i18n](https://github.com/jamesarosen/ember-i18n), you can also specify a translation key.
* `css`: Custom CSS Classes
  * `form`
  * `group` (`div` wrapping every form element including label and validation messages)
  * `control` (applied to form elements like `input`, `select`, ...)
  * `label`
  * `radio` (`div` wrapping radio button groups)
  * `checkbox` (`div` wrapping checkboxes)
  * `help` (`span` containing validation messages)
  * `hint` (`p` containing form input hints)
  * `button`
  * `submit` (Special styling for the submit button, overrides `button`)
  * `error` (Name of the class added to `group` when the element is invalid)
  * `valid` (Name of the class added to `group` when the element is valid)
  * `loading` (Name of the class added to `button` when the element is loading)

See an example integration of Bootstrap (v3 and v4) and Semantic UI below.

### Bootstrap v4

{{docs-snippet name='config-bootstrap-v4.js' title='config/environment.js'}}

### Bootstrap v3

{{docs-snippet name='config-bootstrap-v3.js' title='config/environment.js'}}

### Semantic UI

{{docs-snippet name='config-semantic.js' title='config/environment.js'}}
