import { getOwner } from "@ember/application";

export default function (component) {
  return function (_, propertyName) {
    return {
      get() {
        const parts = component.split("/");
        const componentName = parts.slice(1, parts.length).join("/");

        if (this.args[propertyName]) {
          return this.args[propertyName];
        }

        const config =
          getOwner(this).resolveRegistration("config:environment")[
            "ember-validated-form"
          ] !== undefined
            ? getOwner(this).resolveRegistration("config:environment")[
                "ember-validated-form"
              ]
            : {};

        const theme = config.theme;
        const defaultComponent = config.defaults?.[componentName];

        const name = parts.pop();
        const basePath = parts.join("/");

        return (
          defaultComponent ||
          (theme
            ? `${basePath}/-themes/${theme}/${name}`
            : `${basePath}/${name}`)
        );
      },
    };
  };
}
