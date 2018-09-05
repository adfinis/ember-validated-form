# Customization

## validated-input

The whole `{{validated-input}}` appearance and behaviour can be customized to
your specific needs.

### Input

If the input element you need is not explicitly supported, you can easily
integrate it with this addon by using the `component` template helper to pass
a `renderComponent`:

<!-- prettier-ignore-start -->
{{#docs-demo as |demo|}}
  {{#demo.example name='custom-input-template.hbs'}}
    {{#validated-form model=(changeset (hash example=null color=null)) as |f|}}
      {{f.input
        label='Favorite Color'
        name='color'
        renderComponent=(component 'favorite-colors-component'
          colors=(array (hash color='red' name='Red') (hash color='blue' name='Blue') (hash color='green' name='green'))
        )
      }}
    {{/validated-form}}
  {{/demo.example}}

  {{demo.snippet 'custom-input-template.hbs'}}
  {{demo.snippet 'favorite-colors-component.hbs' label='templates/components/favorite-colors-component.hbs'}}
{{/docs-demo}}
<!-- prettier-ignore-end -->

**Arguments**

- `<*>` **value** The current value of the field
- `<String>` **type** The type of the field
- `<String>` **inputId** The ID of the field (this is a UUIDv4)
- `<Object[]>` **options** The options for selects or radio groups
- `<String>` **name** The name of the field
- `<Boolean>` **disabled** Whether the field is disabled
- `<Boolean>` **autofocus** Whether to autofocus the field
- `<Boolean>` **autocomplete** Whether to enable autocompletion on the field
- `<Number>` **rows** The rows of the textarea
- `<Number>` **cols** The cols of the textarea
- `<Changeset>` **model** The model of the form
- `<Boolean>` **isValid** Whether the form data is valid
- `<Boolean>` **isInvalid** Whether the form data is invalid
- `<String>` **placeholder** The placeholder of the field
- `<String>` **class** The class for the render wrapper

- [`<String>` **optionLabelPath** ](https://github.com/DockYard/ember-one-way-select#working-with-objects-instead-of-strings)
- [`<String>` **optionValuePath**](https://github.com/DockYard/ember-one-way-select#working-with-objects-instead-of-strings)
- [`<String>` **optionTargetPath**](https://github.com/DockYard/ember-one-way-select#working-with-objects-instead-of-strings)
- [`<Boolean>` **includeBlank**](https://github.com/DockYard/ember-one-way-select#adding-a-blank-or-prompt-option)
- [`<Boolean>` **multiple**](https://github.com/DockYard/ember-one-way-select#multiple-select)

- `<Action>` **update** Action to update the value
- `<Action>` **setDirty** Action to mark the field as dirty

- `<Component>` **labelComponent** The label component
- `<Component>` **hintComponent** The hint component
- `<Component>` **errorComponent** The error component

### Label

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
      {{f.input labelComponent=(component 'custom-label') label='Custom Label'}}
    {{/validated-form}}
  {{/demo.example}}

  {{demo.snippet 'custom-label-template.hbs'}}
  {{demo.snippet 'custom-label-component-template.hbs' label='templates/components/custom-label.hbs'}}
{{/docs-demo}}
<!-- prettier-ignore-end -->

**Arguments**

- `<String>` **label** The label of the field
- `<String>` **inputId** The id of the field, this is mostly used for the `for` attribute
- `<Boolean>` **required** Whether the field is required
- `<Boolean>` **isValid** Whether the field is valid
- `<Boolean>` **isInvalid** Whether the field is invalid

### Hint

<!-- prettier-ignore-start -->
{{#docs-demo as |demo|}}
  {{#demo.example name='custom-hint-template.hbs'}}
    {{#validated-form as |f|}}
      {{f.input hint='This is a hint' hintComponent=(component 'custom-hint')}}
    {{/validated-form}}
  {{/demo.example}}

  {{demo.snippet 'custom-hint-template.hbs'}}
  {{demo.snippet 'custom-hint-component-template.hbs' label='templates/components/custom-hint.hbs'}}
{{/docs-demo}}
<!-- prettier-ignore-end -->

**Arguments**

- `<String>` **hint** The hint for the field

### Error

<!-- prettier-ignore-start -->
{{#docs-demo as |demo|}}
  {{#demo.example name='custom-error-template.hbs'}}
    {{#validated-form as |f|}}
      {{f.input showValidity=true errors=(array 'foo' 'bar') errorComponent=(component 'custom-error')}}
    {{/validated-form}}
  {{/demo.example}}

  {{demo.snippet 'custom-error-template.hbs'}}
  {{demo.snippet 'custom-error-component-template.hbs' label='templates/components/custom-error.hbs'}}
{{/docs-demo}}
<!-- prettier-ignore-end -->

**Arguments**

- `<String[]>` **errors** The error messages of the field

## validated-button

<!-- prettier-ignore-start -->
{{#docs-demo as |demo|}}
  {{#demo.example name='custom-button-template.hbs'}}
    {{#validated-form as |f|}}
      {{f.submit label='Submit' buttonComponent=(component 'custom-button')}}
    {{/validated-form}}
  {{/demo.example}}

  {{demo.snippet 'custom-button-template.hbs'}}
  {{demo.snippet 'custom-button-component-template.hbs' label='templates/components/custom-button.hbs'}}
{{/docs-demo}}
<!-- prettier-ignore-end -->

**Arguments**

- `<Action>` **onclick** The onclick action passed to the button. Mostly, this will be the `submit` action of the form
- `<Boolean>` **disabled** Whether the button is disabled
- `<String>` **label** The text of the button
- `<String>` **type** The type of the button
- `<String>` **class** The class of the button
