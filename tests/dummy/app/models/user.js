import Model from 'ember-data/model';
import attr  from 'ember-data/attr';

export default Model.extend({
  firstName: attr('string'),
  lastName: attr('string'),
  aboutMe: attr('string'),
  country: attr('string')
});
