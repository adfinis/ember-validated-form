# Configuration

## Theme

By setting the `theme` option, you can choose from a set of provided themes
for `ember-uikit`. Currently we only support `bootstrap` and `uikit`.

<DocsSnippet @name='config-theme.js' @title='config/environment.js' />

The idea for the future is to support various commonly used CSS frameworks
like Material Design, Semantic UI or Bulma. **Pull Requests implementing such a theme
are more than welcome!**

## Other features

If you want to scroll the first invalid field into view, you can set the
`scrollErrorIntoView` property to `true` (default: `false`).

<DocsSnippet @name='config-features.js' @title='ember-cli-build.js' />
