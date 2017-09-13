/* eslint-env node */
module.exports = {
  afterInstall() {
    return this.addAddonsToProject({
      packages: [
        { name: 'ember-changeset' },
        { name: 'ember-changeset-validations' }
      ]
    });
  }
};
