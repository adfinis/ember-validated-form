# Configuration

## Theme

By setting the `theme` option, you can choose from a set of provided themes
for `ember-uikit`. Currently we only support `bootstrap` and `uikit`.

<DocsSnippet @name='config-theme.js' @title='config/environment.js' />

The idea for the future is to support various commonly used CSS frameworks
like Material Design, Semantic UI or Bulma. **Pull Requests implementing such a theme
are more than welcome!**

## Defaults

If you want to specify a global custom component for yourself you can set the
`defaults.[component]` property to the name of your custom component.

<DocsSnippet @name='config-defaults.js' @title='ember-cli-build.js' />

For instance:

<!-- prettier-ignore-start -->
<DocsDemo as |demo|>
  <demo.example>
    <ValidatedForm as |f|>
      <f.input @type='textarea' @label='About me' @name='aboutMe' @hint='Write a short description about yourself' />
    </ValidatedForm>
  </demo.example>

  <demo.snippet @name='config-custom-hint.js' @label='ember-cli-build.js' />
  <demo.snippet @name='permanent-custom-hint-component-template.hbs' @label='myapp/components/permanent-custom-hint.hbs' />
</DocsDemo>
<!-- prettier-ignore-end -->

## Other features

If you want to scroll the first invalid field into view, you can set the
`scrollErrorIntoView` property to `true` (default: false).

<DocsSnippet @name='config-features.js' @title='ember-cli-build.js' />
