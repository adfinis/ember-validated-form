import Component from "../../input";

export default Component.extend({
  classNames: ["uk-input"],
  classNameBindings: ["isValid:uk-form-success", "isInvalid:uk-form-danger"],
});
