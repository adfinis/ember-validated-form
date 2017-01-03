import ValidatedForm from 'ember-validated-form/components/validated-form/component';
import config from '../../config/environment';

export default ValidatedForm.extend({
  config: config['ember-validated-form']
});
