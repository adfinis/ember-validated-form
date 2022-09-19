// BEGIN-SNIPPET quickstart-validations.js
import {
  validatePresence,
  validateLength,
  validateInclusion,
} from "ember-changeset-validations/validators";

export default {
  firstName: [validatePresence(true), validateLength({ min: 3, max: 40 })],
  lastName: [validatePresence(true), validateLength({ min: 3, max: 40 })],
  aboutMe: [validateLength({ allowBlank: true, max: 200 })],
  country: [validatePresence(true)],
  title: [validatePresence(true)],
  terms: [
    validateInclusion({
      list: [true],
      message: "Please accept the terms and conditions!",
    }),
  ],
  color: [validatePresence(true)],
};
// END-SNIPPET
