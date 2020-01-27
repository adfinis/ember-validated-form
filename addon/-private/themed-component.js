import { get, computed, getWithDefault } from "@ember/object";
import { getOwner } from "@ember/application";

export default component => {
  return computed({
    get() {
      const parts = component.split("/");
      const [, ...componentNameParts] = parts;

      if (this.get(`overrideComponents.${componentNameParts}`)) {
        return this.get(`overrideComponents.${componentNameParts}`);
      }

      const config = getWithDefault(
        getOwner(this).resolveRegistration("config:environment"),
        "ember-validated-form",
        {}
      );

      const theme = get(config, "theme");
      const defaultComponent = get(
        config,
        `defaults.${componentNameParts.join("/")}`
      );

      const name = parts.pop();
      const basePath = parts.join("/");

      return (
        defaultComponent ||
        (theme ? `${basePath}/-themes/${theme}/${name}` : `${basePath}/${name}`)
      );
    },
    set(key, value) {
      if (!this.get(`overrideComponents`)) {
        this.set(`overrideComponents`, {});
      }
      this.set(`overrideComponents.${key}`, value);
      return value;
    }
  });
};
