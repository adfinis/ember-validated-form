## Validated input

`{{validated-form}}` yields an object, that contains the [contextual
component](https://emberjs.com/blog/2016/01/15/ember-2-3-released.html#toc_contextual-components)
`input`. All input fields share some common properties:

**label `<String>`**  
The label of the form field.

**name `<String>`**  
This is is the name of the model property this input is bound to.

**inputName `<String>`**  
The name attribute of the input element. If not passed it will default to the
passed `name`.

**hint `<String>`**  
Additional explanatory text displayed below the input field.

**type `<String>`**  
Type of the form field (see supported field types below). Default: `text`.

**disabled `<Boolean>`**  
Specifies if the input field is disabled.

**required `<Boolean>`**  
If true, a "\*" is appended to the field"s label indicating that it is
required.

**value `<String>`**  
Initial value of the form field. Default: model property defined by name.

**validateBeforeSubmit `<Boolean>`**  
Specifies whether to run validations on this input before the form has been
submitted. Defaults to the value set on the form.

**on-update `<Action>`**  
Per default, the input elements are two-way-bound. If you want to implement
custom update behavior, pass an action as `on-update`. The function receives
two arguments: `update(value, changeset)`.

**autocomplete `<String>`**  
Binding to the [`<input>` `autocomplete` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-autocomplete).

The supported field types are `checkbox`, `checkboxGroup`, `radioGroup`, `select`, `textarea`
and any type that can be specified on an `<input>` element. This addon does
not much more than translating `{{f.input type='select'}}` to
`{{one-way-select}}` or `{{f.input type='text'}}` to `<input type="text">`
with the various other properties (`name`, `disabled`, etc.) and event
handlers.

However, some field types require extra parameters. The supported field types
are listed below.

### Text input

If no field type is specified, a simple `<input type="text">` is rendered.
Other HTML5 text-like inputs like `email`, `number`, `search` require
specifying their type. The element also supports the following options:

- `placeholder`
- `autofocus`

<!-- prettier-ignore-start -->
{{#docs-demo as |demo|}}
  {{#demo.example name='text-input-template.hbs'}}
    {{#validated-form model=(changeset (hash firstName=null email=null)) as |f|}}
      {{f.input label='First name' name='firstName'}}
      {{f.input type='email' label='Email' name='email' placeholder='you@example.com'}}
    {{/validated-form}}
  {{/demo.example}}

  {{demo.snippet 'text-input-template.hbs'}}
{{/docs-demo}}
<!-- prettier-ignore-end -->

### Textarea

The textarea element also supports the following options:

- `rows` and `cols`
- `autofocus`
- `placeholder`

<!-- prettier-ignore-start -->
{{#docs-demo as |demo|}}
  {{#demo.example name='textarea-template.hbs'}}
    {{#validated-form model=(changeset (hash description=null)) as |f|}}
      {{f.input type='textarea' label='Description' name='description'}}
    {{/validated-form}}
  {{/demo.example}}

  {{demo.snippet 'textarea-template.hbs'}}
{{/docs-demo}}
<!-- prettier-ignore-end -->

### Select

The select element supports more options (see [`{{one-way-select}}`](https://github.com/DockYard/ember-one-way-select)):

- `value`
- `options`
- `optionLabelPath`
- `optionValuePath`
- `optionTargetPath`
- `includeBlank`
- `promptIsSelectable`

The `prompt` property is currently not supported (see this [related
issue](https://github.com/DockYard/ember-one-way-controls/issues/152)).

<!-- prettier-ignore-start -->
{{#docs-demo as |demo|}}
  {{#demo.example name='select-template.hbs'}}
    {{#validated-form model=(changeset (hash country=null)) as |f|}}
      {{f.input
        type               = 'select'
        label              = 'Country'
        name               = 'country'
        options            = (array 'USA' 'Switzerland' 'Germany' 'Spain' 'India')
        includeBlank       = 'Please choose...'
        promptIsSelectable = true
      }}
    {{/validated-form}}
  {{/demo.example}}

  {{demo.snippet 'select-template.hbs'}}
{{/docs-demo}}
<!-- prettier-ignore-end -->

### Checkbox

This component renders an `<input type="checkbox">` elements.

<!-- prettier-ignore-start -->
{{#docs-demo as |demo|}}
  {{#demo.example name='checkbox-template.hbs'}}
    {{#validated-form model=(changeset (hash terms=null)) as |f|}}
      {{f.input type='checkbox' label='I agree with the terms and conditions' name='terms'}}
    {{/validated-form}}
  {{/demo.example}}

  {{demo.snippet 'checkbox-template.hbs'}}
{{/docs-demo}}
<!-- prettier-ignore-end -->

### Radio button group

This component renders a list of `<input type="radio">` elements.

<!-- prettier-ignore-start -->
{{#docs-demo as |demo|}}
  {{#demo.example name='radio-template.hbs'}}
    {{#validated-form model=(changeset (hash shape=null)) as |f|}}
      {{f.input
        type    = 'radioGroup'
        label   = 'Shapes'
        name    = 'shape'
        options = (array (hash key='t' label='Triangle') (hash key='s' label='Square') (hash key='c' label='Circle'))
      }}
    {{/validated-form}}
  {{/demo.example}}

  {{demo.snippet 'radio-template.hbs'}}
{{/docs-demo}}
<!-- prettier-ignore-end -->

<!-- this doesn't work
If you want to customize the markup for each radio-button's label, you can
invoke this component using block form. This is helpful if you need to
localize your labels using an internationalization addon like
[ember-intl](https://github.com/ember-intl/ember-intl).

{{#docs-demo as |demo|}}
  {{#demo.example name='radio-i18n-template.hbs'}}
    {{#validated-form model=(changeset (hash shape=null)) as |f|}}
      {{#f.input
        type    = 'radioGroup'
        label   = (t 'some.scope.shapes')
        name    = 'shape'
        options = (array (hash key='t' label='some.scope.triangle') (hash key='s' label='some.scope.square') (hash key='c' label='some.scope.circle'))
      as |option|}}
        {{t option.label}}
      {{/f.input}}
    {{/validated-form}}
  {{/demo.example}}

  {{demo.snippet 'radio-i18n-template.hbs'}}
  {{demo.snippet 'translations.js' label='locales/fr/translations.js'}}
{{/docs-demo}}
-->

### Checkbox group

This component renders a list of `<input type="checkbox">` elements.

<!-- prettier-ignore-start -->
{{#docs-demo as |demo|}}
  {{#demo.example name='checkbox-group-template.hbs'}}
    {{#validated-form model=(changeset (hash shape=null)) as |f|}}
      {{f.input
        type    = 'checkboxGroup'
        label   = 'Shapes'
        name    = 'shape'
        options = (array (hash key='t' label='Triangle') (hash key='s' label='Square') (hash key='c' label='Circle'))
      }}
    {{/validated-form}}
  {{/demo.example}}

  {{demo.snippet 'checkbox-group-template.hbs'}}
{{/docs-demo}}
<!-- prettier-ignore-end -->
