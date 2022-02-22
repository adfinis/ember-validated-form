import { importSync, getOwnConfig } from "@embroider/macros";
import { ensureSafeComponent } from "@embroider/util";
import { cached } from "tracked-toolbox";

export default function passedOrDefault(componentName) {
  return function (target, property) {
    return cached(target, property, {
      get() {
        return ensureSafeComponent(
          this.args[property] ??
            importSync(getOwnConfig()[componentName]).default,
          this
        );
      },
    });
  };
}
