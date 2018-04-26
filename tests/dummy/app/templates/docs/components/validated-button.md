# Validated button

`{{validated-form}}` also yields a submit button component that can be
accessed with `{{f.submit}}`. You can also use it as a block style component
`{{#f.submit}}Test{{/f.submit}}` if you don't want to pass the label as a
property. It takes the following properties:

<div class="rounded border bg-grey-lightest my-8 p-4">
**label `<String>`**
<br>
The label of the form button.
<br>
<br>
**type `<String>`**
<br>
Type of the button. Default: `button`.
<br>
<br>
**disabled `<Boolean>`**
<br>
Specifies if the button is disabled.
<br>
<br>
**loading `<Boolean>`**
<br>
Specifies if the button is loading. Default: Automatic integration of `ember-concurrency`.
</div>

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
