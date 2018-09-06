import { get, computed } from "@ember/object";
import { getOwner } from "@ember/application";

export default component => {
  return computed(function() {
    let parts = component.split("/");

    const theme = get(
      getOwner(this).resolveRegistration("config:environment"),
      "ember-validated-form.theme"
    );

    const name = parts.pop();
    const basePath = parts.join("/");

    return theme
      ? `${basePath}/-themes/${theme}/${name}`
      : `${basePath}/${name}`;
  });
};
