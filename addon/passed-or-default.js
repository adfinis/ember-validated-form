import { ensureSafeComponent } from '@embroider/util';
import { getOwner } from '@ember/application';

// Mapping of component names to their actual paths
const COMPONENT_PATHS = {
  error: 'validated-input/error',
  hint: 'validated-input/hint',
  label: 'validated-input/label',
  render: 'validated-input/render',
  button: 'validated-button/button',
  'types/checkbox-group': 'validated-input/types/checkbox-group',
  'types/checkbox': 'validated-input/types/checkbox',
  'types/input': 'validated-input/types/input',
  'types/radio-group': 'validated-input/types/radio-group',
  'types/select': 'validated-input/types/select',
  'types/textarea': 'validated-input/types/textarea',
  'types/date': 'validated-input/types/input',
};

export default function passedOrDefault(componentName) {
  return function (target, property) {
    return {
      get() {
        // If a component is passed via args, use that
        if (this.args[property]) {
          return ensureSafeComponent(this.args[property], this);
        }

        // Try to get custom component from application configuration
        try {
          const owner = getOwner(this);
          const config = owner.resolveRegistration('config:environment');
          const emberValidatedFormConfig = config['ember-validated-form'];

          if (
            emberValidatedFormConfig &&
            emberValidatedFormConfig.defaults &&
            emberValidatedFormConfig.defaults[componentName]
          ) {
            const customComponentName = emberValidatedFormConfig.defaults[componentName];
            // window.console.log(`passedOrDefault: Attempting to use custom component: ${customComponentName} for ${componentName}`);

            // Try to resolve the custom component
            const customComponent = owner.resolveRegistration(`component:${customComponentName}`);
            if (customComponent) {
              // window.console.log(`passedOrDefault: Successfully resolved custom component: ${customComponentName}`);
              return ensureSafeComponent(customComponent, this);
            } else {
              // window.console.warn(`passedOrDefault: Could not resolve custom component: ${customComponentName}, falling back to default`);
            }
          }
        } catch (error) {
          // window.console.warn(`passedOrDefault: Error resolving custom component for ${componentName}:`, error);
        }

        // Fall back to default component resolution using the mapping
        try {
          const owner = getOwner(this);
          const componentPath = COMPONENT_PATHS[componentName];

          if (componentPath) {
            const defaultComponent = owner.resolveRegistration(`component:${componentPath}`);

            if (defaultComponent) {
              // window.console.log(`passedOrDefault: Using default component: ${componentPath} for ${componentName}`);
              return ensureSafeComponent(defaultComponent, this);
            } else {
              // window.console.warn(`passedOrDefault: Could not resolve default component: ${componentPath}`);
            }
          } else {
            // window.console.warn(`passedOrDefault: No component path mapping found for: ${componentName}`);
          }
        } catch (error) {
          // window.console.warn(`passedOrDefault: Error resolving default component for ${componentName}:`, error);
        }

        // Ultimate fallback - return null
        window.console.warn(`passedOrDefault: No component found for ${componentName}, returning null`);
        return null;
      },
    };
  };
}
