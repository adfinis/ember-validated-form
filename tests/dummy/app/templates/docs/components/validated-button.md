# Validated button

`{{validated-form}}` yields two kinds of button components:
- `{{f.submit}}`: a submit button for the form
- `{{f.button}}`: a customizable button without HTML-form specific functionality.

You can use them as a block style component `{{#f.submit}}Test{{/f.submit}}` if you don't want to pass the label as a
property.

Both take the following properties:

**label `<String>`**
The label of the form button.

**type `<String>`**
Type of the button. Default for submit: `submit` and for standard button: `button`.
*Watch out:* If you define `type=submit` then the `on-submit` handler of the form will be triggered.

**disabled `<Boolean>`**
Specifies if the button is disabled.

**loading `<Boolean>`**
Specifies if the button is loading. Default: Automatic integration of `ember-concurrency`.

<!-- prettier-ignore-start -->
{{#docs-demo as |demo|}}
  {{#demo.example name='button-template.hbs'}}
    {{#validated-form on-submit=(action (mut saved) true) as |f|}}
      {{f.submit label='Save'}}
      {{#f.submit}}Still save but in block style...{{/f.submit}}
      {{if saved 'Saved!'}}
    {{/validated-form}}
  {{/demo.example}}

  {{demo.snippet 'button-template.hbs'}}
{{/docs-demo}}
<!-- prettier-ignore-end -->


Further you can leverage the `{{f.button}}` component for custom actions. The model of the wrapping form component will get passed to the on-click handler as first argument.

Passing a custom on click function is possible on the `{{f.buttton}}` via:

**on-click `<Function>`**
Passes an on-click function to the button component.

**on-invalid-click `<Function>`**
Passes a function which is triggered after clicking on the button and when the validation proved the contents to be invalid.

<!-- prettier-ignore-start -->
{{#docs-demo as |demo|}}
  {{#demo.example name='button-advanced-template.hbs'}}
    {{#validated-form as |f|}}
      {{f.button label='Custom action' on-click=(action (mut triggered) true)}}
      {{#f.button on-click=(action (mut triggered) true)}}Custom action button in block style...{{/f.button}}
      {{if triggered 'Action triggered!'}}
    {{/validated-form}}
  {{/demo.example}}

  {{demo.snippet 'button-advanced-template.hbs'}}
{{/docs-demo}}
<!-- prettier-ignore-end -->