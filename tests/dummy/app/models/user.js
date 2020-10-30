import Model from "@ember-data/model";
import { attr } from "@ember-data/model";

export default Model.extend({
  firstName: attr("string"),
  lastName: attr("string"),
  aboutMe: attr("string"),
  country: attr("string"),
  gender: attr("string"),
  terms: attr("string"),
  color: attr("string"),
});
