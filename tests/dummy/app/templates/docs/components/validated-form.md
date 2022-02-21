# Validated form

The `<ValidatedForm />` component accepts the following arguments:

**model `<Changeset>`**  
Changeset object containing the model that backs the form.

**validateBeforeSubmit `<Boolean>`**  
Specifies whether to run validations on inputs before the form has been
submitted. Defaults to true.

**on-submit `<Action>`**  
Action, that is triggered on form submit if the changeset is valid. The
changeset is passed as a parameter. If the action returns a promise, then any
rendered submit buttons will have a customizable CSS class added and the yielded
`loading` template parameter will be set.

**on-invalid-submit `<Action>`**  
Action, that is triggered on form submit if the changset is invalid. The
changeset is passed as a parameter. (Optional)

**autocomplete `<String>`**  
Binding to the [`<form>` `autocomplete`
attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-autocomplete).

When the submission of your form takes a little longer and your users are of
the impatient kind, it is often necessary to disable the submit button to
prevent the form from being submitted multiple times. This can be done using
the `loading` template parameter:

<!-- prettier-ignore-start -->
<DocsDemo as |demo|>
  <demo.example @name='validated-form-action-template.hbs'>
    <ValidatedForm @model={{changeset this.model}} @on-submit={{this.submitAction}} as |f|>
      {{#let f.submit as |Submit|}}
        <Submit @label={{if f.loading 'Saving...' 'Save'}} @disabled={{f.loading}}/>
      {{/let}}
    </ValidatedForm>
  </demo.example>

  <demo.snippet @name='validated-form-action-template.hbs' />
  <demo.snippet @name='validated-form-action-controller.js' />
  <demo.snippet @name='validated-form-route.js' @label='route.js' />
</DocsDemo>
<!-- prettier-ignore-end -->

It also works very well with [ember-concurrency](http://ember-concurrency.com/) tasks:

<!-- prettier-ignore-start -->
<DocsDemo as |demo|>
  <demo.example @name='validated-form-task-template.hbs'>
    <ValidatedForm @model={{changeset this.model}} @on-submit={{perform this.submitTask}} as |f|>
      {{#let f.submit as |Submit|}}
        <Submit @label={{if f.loading 'Saving...' 'Save'}} @disabled={{f.loading}}/>
      {{/let}}
    </ValidatedForm>
  </demo.example>

  <demo.snippet @name='validated-form-task-template.hbs' />
  <demo.snippet @name='validated-form-task-controller.js' />
  <demo.snippet @name='validated-form-route.js' @label='route.js' />
</DocsDemo>
<!-- prettier-ignore-end -->
