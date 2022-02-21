# Validated button

`<ValidatedForm />` yields two kinds of button components:

- `<f.submit />`: a submit button for the form
- `<f.button />`: a customizable button without HTML-form specific functionality.

You can use them as a block style component `<f.submit>Test</f.submit>` if you don't want to pass the label as a
property.

Both take the following properties:

**label `<String>`**
The label of the form button.

**type `<String>`**
Type of the button. Default for submit: `submit` and for standard button: `button`.
_Watch out:_ If you define `type=submit` then the `on-submit` handler of the form will be triggered.

**disabled `<Boolean>`**
Specifies if the button is disabled.

**loading `<Boolean>`**
Specifies if the button is loading. Default: Automatic integration of `ember-concurrency`.

<!-- prettier-ignore-start -->
<DocsDemo as |demo|>
  <demo.example @name='button-template.hbs'>
    <ValidatedForm @on-submit={{fn (mut this.saved) true}} as |f|>
      {{#let f.submit as |Submit|}}
        <Submit @label={{"Save"}} />
        <Submit>Save button in block style...</Submit>
      {{/let}}
        {{if this.saved 'Saved!'}}
    </ValidatedForm>
  </demo.example>

  <demo.snippet @name='button-template.hbs' />
</DocsDemo>
<!-- prettier-ignore-end -->

Further you can leverage the `{{f.button}}` component for custom actions. The model of the wrapping form component will get passed to the on-click handler as first argument.

Custom buttons support the following additional options:

**on-click `<Function>`**
Passes an on-click function to the button component.

**on-invalid-click `<Function>`**
Passes a function which is triggered after clicking on the button and when the validation proved the contents to be invalid.

**triggerValidations `<Boolean>`**
Trigger the form validations when the button is clicked (or, more precisely: show all error messages).

<!-- prettier-ignore-start -->
<DocsDemo as |demo|>
  <demo.example @name='button-advanced-template.hbs'>
    <ValidatedForm as |f|>
      {{#let f.button as |CustomButton|}}
        <CustomButton @label="Real Custom" @on-click={{fn (mut this.triggered) true}}/>
        <CustomButton @on-click={{fn (mut this.triggered) true}}>Custom action button in block style...</CustomButton>
      {{/let}}
      {{if this.triggered 'Action triggered!'}}
    </ValidatedForm>
  </demo.example>

  <demo.snippet @name='button-advanced-template.hbs' />
</DocsDemo>
<!-- prettier-ignore-end -->
