import { helper } from "@ember/component/helper";
import { isEmpty } from "@ember/utils";

export default helper(function classList(classes) {
  return classes
    .filter((cls) => !isEmpty(cls))
    .map((cls) => cls.trim())
    .join(" ");
});
