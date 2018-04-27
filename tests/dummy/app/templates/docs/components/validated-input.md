## Validated input

`{{validated-form}}` yields an object, that contains the [contextual
component](https://emberjs.com/blog/2016/01/15/ember-2-3-released.html#toc_contextual-components)
`input`. All input fields share some common properties:

<div class="rounded border bg-grey-lightest my-8 p-4">
**label `<String>`**
<br>
The label of the form field.
<br>
<br>
**name `<String>`**
<br>
This is is the name of the model property this input is bound to.
<br>
<br>
**hint `<String>`**
<br>
Additional explanatory text displayed below the input field.
<br>
<br>
**type `<String>`**
<br>
Type of the form field (see supported field types below). Default: `text`.
<br>
<br>
**disabled `<Boolean>`**
<br>
Specifies if the input field is disabled.
<br>
<br>
**required `<Boolean>`**
<br>
If true, a "\*" is appended to the field"s label indicating that it is
required.
<br>
<br>
**value `<String>`**
<br>
Initial value of the form field. Default: model property defined by name.
<br>
<br>
**validateBeforeSubmit `<Boolean>`**
<br>
Specifies whether to run validations on this input before the form has been
submitted. Defaults to the value set on the form.
<br>
<br>
**on-update `<Action>`**
<br>
Per default, the input elements are two-way-bound. If you want to implement
custom update behavior, pass an action as `on-update`. The function receives
two arguments: `update(value, changeset)`.
<br>
<br>
**autocomplete `<String>`**
<br>
Binding to the [&lt;input&gt; autocomplete
attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-autocomplete).
</div>

The supported field types are `checkbox`, `radioGroup`, `select`, `textarea`
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

* `placeholder`
* `autofocus`

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

* `rows` and `cols`
* `autofocus`
* `placeholder`

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

* `value`
* `options`
* `optionLabelPath`
* `optionValuePath`
* `optionTargetPath`
* `includeBlank`
* `promptIsSelectable`

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

If you want to customize the markup for each radio-button's label, you can
invoke this component using block form. This is helpful if you need to
localize your labels using something like
[ember-i18n](https://github.com/jamesarosen/ember-i18n).

<!-- prettier-ignore-start -->
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
<!-- prettier-ignore-end -->

### Custom input elements

If the input element you need is not explicitly supported, you can easily
integrate it with this addon by using `f.input` in block form:

<!-- prettier-ignore-start -->
{{#docs-demo as |demo|}}
  {{#demo.example name='custom-input-template.hbs'}}
    {{#validated-form model=(changeset (hash example=null color=null)) as |f|}}
      {{!-- ember-power-select --}}
      {{#f.input name='example' as |fi|}}
        {{#power-select options=(array 'Hans' 'Peter' 'Ruedi') selected=fi.value onchange=fi.update onblur=fi.setDirty as |name|}}
          {{name}}
        {{/power-select}}
      {{/f.input}}

      {{!-- homemade component --}}
      {{#f.input label='Favorite Color' name='color' as |fi|}}
        {{favorite-colors-component
          selected = fi.value
          colors   = (array (hash color='red' name='Red') (hash color='blue' name='Blue') (hash color='green' name='green'))
          onupdate = fi.update onhover=fi.setDirty
        }}
      {{/f.input}}
    {{/validated-form}}
  {{/demo.example}}

  {{demo.snippet 'custom-input-template.hbs'}}
{{/docs-demo}}
<!-- prettier-ignore-end -->

There are three integration points for custom components:

* initialize the state of your component with `fi.value`
* update the model's value with `fi.update`
* mark your component as dirty with `fi.setDirty`

### Custom label components

If you want to have a label on your input which renders something
non-standard (for instance tooltips), then you can pass your custom component
to the input in the following manner:

_Note:_ When adding a custom component for input of type checkbox, one has to
add `{{yield}}` inside the label. This is because, this kind of input renders
inside a label tag.

<!-- prettier-ignore-start -->
{{#docs-demo as |demo|}}
  {{#demo.example name='custom-label-template.hbs'}}
    {{#validated-form as |f|}}
      {{f.input labelComponent=(component 'custom-label' labelText='Custom Label')}}
    {{/validated-form}}
  {{/demo.example}}

  {{demo.snippet 'custom-label-template.hbs'}}
  {{demo.snippet 'custom-label-component-template.hbs' label='templates/components/custom-label.hbs'}}
{{/docs-demo}}
<!-- prettier-ignore-end -->
