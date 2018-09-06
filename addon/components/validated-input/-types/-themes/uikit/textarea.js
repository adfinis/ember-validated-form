import Component from "../../textarea";

export default Component.extend({
  classNames: ["uk-textarea"],
  classNameBindings: ["isValid:uk-form-success", "isInvalid:uk-form-danger"]
});
