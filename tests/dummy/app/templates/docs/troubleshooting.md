# Troubleshooting

## 'Proxy' is undefined (IE11)

`ember-validated-form` installs `ember-changeset` and
`ember-changeset-validations` **v3+** per default which relies heavily on
`Proxy` which is not supported by IE11. If you need to support IE11 you'll
need to [polyfill it](https://github.com/GoogleChrome/proxy-polyfill) or if
you don't want to polyfill it, you can use `ember-changeset` and
`ember-changeset-validations` **v2.x**.
