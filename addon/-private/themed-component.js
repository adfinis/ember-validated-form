import { getOwner } from "@ember/application";
import { computed, get, set } from "@ember/object";

export default (component) => {
  return computed({
    get() {
      const parts = component.split("/");
      const componentNameParts = parts.slice(1, parts.length).join("/");

      if (get(this, `overrideComponents.${componentNameParts}`)) {
        return get(this, `overrideComponents.${componentNameParts}`);
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
      const defaultComponent = get(config, `defaults.${componentNameParts}`);

      const name = parts.pop();
      const basePath = parts.join("/");

      return (
        defaultComponent ||
        (theme ? `${basePath}/-themes/${theme}/${name}` : `${basePath}/${name}`)
      );
    },
    set(key, value) {
      if (!get(this, `overrideComponents`)) {
        set(this, `overrideComponents`, {});
      }
      set(this, `overrideComponents.${key}`, value);
      return value;
    },
  });
};
