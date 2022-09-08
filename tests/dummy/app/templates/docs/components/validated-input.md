## Validated input

`<ValidatedForm />` yields an object, that contains the [contextual
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

The supported field types are `checkbox`, `checkboxGroup`, `radioGroup`,
`select`, `textarea` and any type that can be specified on an `<input>` element.
This addon does not much more than translating `<f.input @type='select' />` to
`<select>` or `<f.input @type='text' />` to `<input type="text">` with the
various other properties (`name`, `disabled`, etc.) and event handlers.

However, some field types require extra parameters. The supported field types
are listed below.

### Text input

If no field type is specified, a simple `<input type="text">` is rendered.
Other HTML5 text-like inputs like `email`, `number`, `search` require
specifying their type. The element also supports the following options:

- `placeholder`
- `autofocus`

<!-- prettier-ignore-start -->
<DocsDemo as |demo|>
  <demo.example @name='text-input-template.hbs'>
    <ValidatedForm @model={{changeset (hash firstName=null email=null)}} as |f|>
      <f.input @label='First name' @name='firstName' />
      <f.input @type='email' @label='Email' @name='email' @placeholder='you@example.com' />
    </ValidatedForm>
  </demo.example>

  <demo.snippet @name='text-input-template.hbs' />
</DocsDemo>
<!-- prettier-ignore-end -->

### Textarea

The textarea element also supports the following options:

- `rows` and `cols`
- `autofocus`
- `placeholder`

<!-- prettier-ignore-start -->
<DocsDemo as |demo|>
  <demo.example @name='textarea-template.hbs'>
    <ValidatedForm @model={{changeset (hash description=null)}} as |f|>
      <f.input @type='textarea' @label='Description' @name='description' />
    </ValidatedForm>
  </demo.example>

  <demo.snippet @name='textarea-template.hbs' />
</DocsDemo>
<!-- prettier-ignore-end -->

### Select

The select element also supports the following options:

- `value`
- `options`
- `optionLabelPath`
- `optionValuePath`
- `optionTargetPath`
- `prompt`
- `promptIsSelectable`
- `groupLabelPath`

<!-- prettier-ignore-start -->
<DocsDemo as |demo|>
  <demo.example @name='select-template.hbs'>
    <ValidatedForm @model={{changeset (hash country=null)}} as |f|>
      <f.input
        @type='select'
        @label='Country'
        @name='country'
        @value='Germany'
        @options={{array 'USA' 'Switzerland' 'Germany' 'Spain' 'India'}}
        @prompt='Please choose...'
        @promptIsSelectable={{true}}
      />
    </ValidatedForm>
  </demo.example>

  <demo.snippet @name='select-template.hbs' />
</DocsDemo>
<!-- prettier-ignore-end -->

**Grouping** is supported in two ways: First by using the `groupLabelPath` property (e.g. `type` in th example below) or second by pre-grouped options in the form of:

```js
[
  {
    groupName: "one",
    options: [
      { id: 1, label: "First", type: "group1" },
      { id: 2, label: "Second", type: "group1" },
    ],
  },
  {
    groupName: "two",
    options: [{ id: 3, label: "Third", type: "group2" }],
  },
];
```

### Checkbox

This component renders an `<input type="checkbox">` elements.

<!-- prettier-ignore-start -->
<DocsDemo as |demo|>
  <demo.example @name='checkbox-template.hbs'>
    <ValidatedForm @model={{changeset (hash terms=null)}} as |f|>
      <f.input @type='checkbox' @label='I agree with the terms and conditions' @name='terms' />
    </ValidatedForm>
  </demo.example>

  <demo.snippet @name='checkbox-template.hbs' />
</DocsDemo>
<!-- prettier-ignore-end -->

### Radio button group

This component renders a list of `<input type="radio">` elements.

<!-- prettier-ignore-start -->
<DocsDemo as |demo|>
  <demo.example @name='radio-template.hbs'>
    <ValidatedForm @model={{changeset (hash shape=null)}} as |f|>
      <f.input
        @type='radioGroup'
        @label='Shapes'
        @name='shape'
        @options={{array (hash key='t' label='Triangle') (hash key='s' label='Square') (hash key='c' label='Circle')}}
      />
    </ValidatedForm>
  </demo.example>

  <demo.snippet @name='radio-template.hbs' />
</DocsDemo>
<!-- prettier-ignore-end -->

<!-- this doesn't work
If you want to customize the markup for each radio-button's label, you can
invoke this component using block form. This is helpful if you need to
localize your labels using an internationalization addon like
[ember-intl](https://github.com/ember-intl/ember-intl).

<DocsDemo as |demo|>
  <demo.example @name='radio-i18n-template.hbs'>
    <ValidatedForm @model={{changeset (hash shape=null)}} as |f|>
      <f.input
        @type='radioGroup'
        @label={{t 'some.scope.shapes'}}
        @name='shape'
        @options={{array (hash key='t' label='some.scope.triangle') (hash key='s' label='some.scope.square') (hash key='c' label='some.scope.circle')}}
      as |option|>
        {{t option.label}}
      </f.input>
    </ValidatedForm>
  </demo.example>

  <demo.snippet @name='radio-i18n-template.hbs' />
  <demo.snippet @name='translations.js' @label='locales/fr/translations.js' />
</DocsDemo>
-->

### Checkbox group

This component renders a list of `<input type="checkbox">` elements.

<!-- prettier-ignore-start -->
<DocsDemo as |demo|>
  <demo.example @name='checkbox-group-template.hbs'>
    <ValidatedForm @model={{changeset (hash shape=null)}} as |f|>
      <f.input
        @type='checkboxGroup'
        @label='Shapes'
        @name='shape'
        @options={{array (hash key='t' label='Triangle') (hash key='s' label='Square') (hash key='c' label='Circle')}}
      />
    </ValidatedForm>
  </demo.example>

  <demo.snippet @name='checkbox-group-template.hbs' />
</DocsDemo>
<!-- prettier-ignore-end -->
