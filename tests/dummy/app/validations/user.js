import {
  validatePresence,
  validateLength
} from 'ember-changeset-validations/validators';


function validateTerm() {
  return (key, newValue) => {
    // validation logic
    // return `true` if valid || error message string if invalid
    let result = newValue === true;

    if (!result) {
      return "Terms must be accepted!";
    }

    return true;
  };
}


export default {
  firstName: [
    validatePresence(true),
    validateLength({min: 3, max: 40})
  ],
  lastName: [
    validatePresence(true),
    validateLength({min: 3, max: 40})
  ],
  aboutMe: [ validateLength({allowBlank: true, max: 200}) ],
  country: [ validatePresence(true) ],
  gender: [ validatePresence(true) ],
  accepTheTerms: [ validateTerm() ],
  color: [validatePresence(true)]
};
