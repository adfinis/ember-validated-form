# Configuration

## Theme

By setting the `theme` option, you can choose from a set of provided themes
for `ember-uikit`. Currently we only support `bootstrap` and `uikit`.

{{docs-snippet name='config-theme.js' title='config/environment.js'}}

The idea for the future is to support various commonly used CSS frameworks
like Material Design, Semantic UI or Bulma. **Pull Requests implementing such a theme
are more than welcome!**

## Defaults

If you want to specify a global custom component for yourself you can set the
`defaults.[component]` property to the name of your custom component.

{{docs-snippet name='config-defaults.js' title='config/environment.js'}}

For instance:

<!-- prettier-ignore-start -->
{{#docs-demo as |demo|}}
  {{#demo.example}}
    {{#validated-form as |f|}}
      {{f.input type='textarea' label='About me' name='aboutMe' hint='Write a short description about yourself'}}
    {{/validated-form}}
  {{/demo.example}}

  {{demo.snippet 'config-custom-hint.js' label='config.js'}}
  {{demo.snippet 'permanent-custom-hint-component.js' label='permanent-custom-hint.js'}}
  {{demo.snippet 'permanent-custom-hint-component-template.hbs' label='permanent-custom-hint.hbs'}}
{{/docs-demo}}
<!-- prettier-ignore-end -->

## Other features

If you want to scroll the first invalid field into view, you can set the
`scrollErrorIntoView` property to `true` (default: false).

{{docs-snippet name='config-features.js' title='config/environment.js'}}
