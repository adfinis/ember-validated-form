import { importSync, getOwnConfig } from "@embroider/macros";
import { ensureSafeComponent } from "@embroider/util";

export default function passedOrDefault(componentName) {
  return function (target, property) {
    return {
      get() {
        return ensureSafeComponent(
          this.args[property] ??
            importSync(getOwnConfig()[componentName]).default,
          this,
        );
      },
    };
  };
}
