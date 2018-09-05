import { computed } from "@ember/object";
import config from "ember-get-config";

const {
  "ember-validated-form": { theme }
} = config;

export default component => {
  return computed(function() {
    let parts = component.split("/");

    const name = parts.pop();
    const basePath = parts.join("/");

    return theme
      ? `${basePath}/-themes/${theme}/${name}`
      : `${basePath}/${name}`;
  });
};
