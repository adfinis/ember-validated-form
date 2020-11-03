import Component from "../../textarea";

export default Component.extend({
  classNameBindings: ["isValid:is-valid", "isInvalid:is-invalid"],
  classNames: ["form-control"],
});
