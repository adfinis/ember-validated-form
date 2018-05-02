# Validated form

The `{{validated-form}}` component accepts the following arguments:

<div class="rounded border bg-grey-lightest my-8 p-4">
**model `<Changeset>`**
<br>
Changeset object containing the model that backs the form.
<br>
<br>
**validateBeforeSubmit `<Boolean>`**
<br>
Specifies whether to run validations on inputs before the form has been
submitted. Defaults to true.
<br>
<br>
**on-submit `<Action>`**
<br>
Action, that is triggered on form submit if the changeset is valid. The
changeset is passed as a parameter. If the action returns a promise, then any
rendered submit buttons will have a customizable CSS class added and the yielded
 `loading` template parameter will be set.
<br>
<br>
**on-invalid-submit `<Action>`**
<br>
Action, that is triggered on form submit if the changset is invalid. The
changeset is passed as a parameter. (Optional)
<br>
<br>
**autocomplete `<String>`**
<br>
Binding to the [&lt;form&gt; `autocomplete`
attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-autocomplete).
</div>

When the submission of your form takes a little longer and your users are of
the impatient kind, it is often necessary to disable the submit button to
prevent the form from being submitted multiple times. This can be done using
the `loading` template parameter:

<!-- prettier-ignore-start -->
{{#docs-demo as |demo|}}
  {{#demo.example name='validated-form-action-template.hbs'}}
    {{#validated-form model=(changeset model) on-submit=(action 'submit') as |f|}}
      {{f.submit label=(if f.loading 'Saving...' 'Save') disabled=f.loading}}
    {{/validated-form}}
  {{/demo.example}}

  {{demo.snippet 'validated-form-action-template.hbs'}}
  {{demo.snippet 'validated-form-action-controller.js'}}
  {{demo.snippet 'validated-form-route.js' label='route.js'}}
{{/docs-demo}}
<!-- prettier-ignore-end -->

It also works very well with [ember-concurrency](http://ember-concurrency.com/) tasks:

<!-- prettier-ignore-start -->
{{#docs-demo as |demo|}}
  {{#demo.example name='validated-form-task-template.hbs'}}
    {{#validated-form model=(changeset model) on-submit=(perform submit) as |f|}}
      {{f.submit label=(if f.loading 'Saving...' 'Save') disabled=f.loading}}
    {{/validated-form}}
  {{/demo.example}}

  {{demo.snippet 'validated-form-task-template.hbs'}}
  {{demo.snippet 'validated-form-task-controller.js'}}
  {{demo.snippet 'validated-form-route.js' label='route.js'}}
{{/docs-demo}}
<!-- prettier-ignore-end -->
