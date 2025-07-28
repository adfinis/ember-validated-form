'use strict';

console.log('🚀 ember-validated-form in-repo addon loading...');

module.exports = {
  name: require('./package').name,
  
  isDevelopingAddon() {
    return true;
  },
  
  included() {
    this._super.included.apply(this, arguments);
    console.log('🎯 ember-validated-form addon included successfully!');
    
    // Simple configuration without @embroider/macros complications
    const app = this._findHost(this);
    console.log('📋 ember-validated-form configuration:', app.options['ember-validated-form'] || 'none');
  }
};
