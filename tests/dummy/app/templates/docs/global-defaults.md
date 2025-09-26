# Global defaults

If you want to specify a global custom component for yourself you can simply create your own component and use the same path that `ember-validated-form` uses. For instance, to create a custom hint component that is used globally in your application, run the following command:

```bash
$ ember g component --component-class @ember/component/template-only validated-input/hint
```

<aside>
  If you are overriding a component that does not have a component class in
  `ember-validated-form`, please make sure to pass the <b>--component-class
  @ember/component/template-only</b> argument to the generate command.
</aside>

<!-- prettier-ignore-start -->
<DocsDemo as |demo|>
  <demo.example>
    <ValidatedForm as |f|>
      <f.input @type='textarea' @label='About me' @name='aboutMe' @hint='Write a short description about yourself' />
    </ValidatedForm>
  </demo.example>

  <demo.snippet @name='permanent-custom-hint-component-template.hbs' @label='myapp/components/validated-input/hint.hbs' />
  <demo.snippet @name='permanent-custom-hint-component-component.js' @label='myapp/components/validated-input/hint.js' />
</DocsDemo>
<!-- prettier-ignore-end -->
