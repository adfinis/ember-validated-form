# Customization

## validated-input

The whole `<ValidatedInput />` appearance and behaviour can be customized to
your specific needs.

### Input

If the input element you need is not explicitly supported, you can easily
integrate it with this addon by using the `component` template helper to pass
a `renderComponent`:

<!-- prettier-ignore-start -->
<DocsDemo as |demo|>
  <demo.example @name='custom-input-template.hbs'>
    <ValidatedForm @model={{changeset (hash example=null color=null)}} as |f|>
      <f.input
        @label='Favorite Color'
        @name='color'
        @renderComponent={{component 'favorite-colors'
          colors=(array
            (hash color='red' name='Red')
            (hash color='blue' name='Blue')
            (hash color='green' name='green')
          )
        }}
      />
    </ValidatedForm>
  </demo.example>

  <demo.snippet @name='custom-input-template.hbs' />
  <demo.snippet @name='favorite-colors.hbs' @label='components/favorite-colors.hbs' />
</DocsDemo>
<!-- prettier-ignore-end -->

**Arguments**

- `<*>` **value** The current value of the field
- `<String>` **type** The type of the field
- `<String>` **inputId** The ID of the field (generated with `guidFor` from `@ember/object/internals`)
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

- `<String>` **optionLabelPath** The property name of the label if objects are given as options
- `<String>` **optionValuePath** The property name of the value if objects are given as options
- `<String>` **optionTargetPath** Identical to `optionValuePath` but the return value will then be that property instead of the whole object
- `<Boolean>` **prompt** Label of the prompt option (most likely an empty default option), will be omitted if left empty
- `<Boolean>` **promptIsSelectable** Whether the prompt option is selectable
- `<Boolean>` **multiple** Whether multiple options can be selected

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
<DocsDemo as |demo|>
  <demo.example @name='custom-label-template.hbs'>
    <ValidatedForm as |f|>
      <f.input @labelComponent={{component 'custom-label'}} @label='Custom Label' />
    </ValidatedForm>
  </demo.example>

  <demo.snippet @name='custom-label-template.hbs' />
  <demo.snippet @name='custom-label-component-template.hbs' @label='components/custom-label.hbs' />
</DocsDemo>
<!-- prettier-ignore-end -->

**Arguments**

- `<String>` **label** The label of the field
- `<String>` **inputId** The id of the field, this is mostly used for the `for` attribute
- `<Boolean>` **required** Whether the field is required
- `<Boolean>` **isValid** Whether the field is valid
- `<Boolean>` **isInvalid** Whether the field is invalid

### Hint

<!-- prettier-ignore-start -->
<DocsDemo as |demo|>
  <demo.example @name='custom-hint-template.hbs'>
    <ValidatedForm as |f|>
      <f.input @hint='This is a hint' @hintComponent={{component 'custom-hint'}} />
    </ValidatedForm>
  </demo.example>

  <demo.snippet @name='custom-hint-template.hbs' />
  <demo.snippet @name='custom-hint-component-template.hbs' @label='components/custom-hint.hbs' />
</DocsDemo>
<!-- prettier-ignore-end -->

**Arguments**

- `<String>` **hint** The hint for the field

### Error

<!-- prettier-ignore-start -->
<DocsDemo as |demo|>
  <demo.example @name='custom-error-template.hbs'>
    <ValidatedForm as |f|>
      <f.input @showValidity={{true}} @errors={{array 'foo' 'bar'}} @errorComponent={{component 'custom-error'}} />
    </ValidatedForm>
  </demo.example>

  <demo.snippet @name='custom-error-template.hbs' />
  <demo.snippet @name='custom-error-component-template.hbs' @label='components/custom-error.hbs' />
</DocsDemo>
<!-- prettier-ignore-end -->

**Arguments**

- `<String[]>` **errors** The error messages of the field

### Date

`ember-validated-form` has no default date picker implemented. If you specify an input
with type `date`, a plain input with the HTML5 (depending on your browser) will
be rendered.

<!-- prettier-ignore-start -->
<DocsDemo as |demo|>
  <demo.example>
    <ValidatedForm as |f|>
      <f.input @type='date' @label='Birthday (Plain HTML5)' @name='birthday' @hint='Enter your birthday' />
    </ValidatedForm>
  </demo.example>
</DocsDemo>
<!-- prettier-ignore-end -->

This is on purpose due to there being many date picker components/addons
available. And not every date picker fits every theme.

If you would like to configure a custom date picker, configure a custom date
component as specified in <DocsLink @route="docs.global-defaults">global defaults</DocsLink>.

<!-- prettier-ignore-start -->
<DocsDemo as |demo|>
  <demo.example @name='custom-date-input-template.hbs'>
    <ValidatedForm @model={{changeset (hash birthday=null)}} as |f|>
      <f.input
        @label='Birthday (Flatpickr)'
        @name='birthday'
        @placeholder="Click to open Flatpickr!"
        @hint='Enter your birthday'
        @renderComponent={{component 'flatpickr-wrapper'}}
      />
    </ValidatedForm>
  </demo.example>

  <demo.snippet @name='custom-date-input-template.hbs' />
  <demo.snippet @name='flatpickr-wrapper.hbs' @label='components/flatpickr-wrapper.hbs' />
</DocsDemo>
<!-- prettier-ignore-end -->

**Arguments**

- `<*>` **value** The current value of the field
- `<Action>` **update** Action to update the value
- `<String>` **inputId** The ID of the field (generated with `guidFor` from `@ember/object/internals`)
- `<String>` **placeholder** The placeholder of the field
- `<Boolean>` **isValid** Whether the form data is valid
- `<Boolean>` **isInvalid** Whether the form data is invalid
- `<Action>` **setDirty** Action to mark the field as dirty
- `<String>` **name** The name of the field
- `<Boolean>` **disabled** Whether the field is disabled
- `<Boolean>` **autocomplete** Whether to enable autocompletion on the field

## validated-button

<!-- prettier-ignore-start -->
<DocsDemo as |demo|>
  <demo.example @name='custom-button-template.hbs'>
    <ValidatedForm as |f|>
      <f.submit @label='Submit' @buttonComponent={{component 'custom-button'}} />
    </ValidatedForm>
  </demo.example>

  <demo.snippet @name='custom-button-template.hbs' />
  <demo.snippet @name='custom-button-component-template.hbs' @label='components/custom-button.hbs' />
</DocsDemo>
<!-- prettier-ignore-end -->

**Arguments**

- `<Action>` **onclick** The onclick action passed to the button. Mostly, this will be the `submit` action of the form
- `<Boolean>` **disabled** Whether the button is disabled
- `<String>` **label** The text of the button
- `<String>` **type** The type of the button
- `<String>` **class** The class of the button
