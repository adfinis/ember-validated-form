# BRANZ Modifications to ember-validated-form

This document tracks all modifications made to the ember-validated-form addon for use as an in-repo addon in the branz-web project.

## Overview

Original addon version: `7.0.1`  
Modified version: `7.0.1-branz.0`  
Purpose: Fix bugs and ensure Ember 5.x compatibility

## Major Changes

### 1. **Fixed passed-or-default.js Bug**
**Problem**: Original implementation used `@embroider/macros` with `importSync(getOwnConfig()[componentName]).default` which caused WeakMap issues and component resolution failures.

**Solution**: Completely rewrote `addon/passed-or-default.js` to use Ember's native resolver:
- Uses `getOwner(this).resolveRegistration()` instead of `importSync`
- Implements proper fallback chain: args → custom components → default components → null
- Added component path mapping for correct resolution
- Improved error handling and logging
- Eliminates WeakMap-related crashes

### 2. **Removed @embroider/macros Dependencies**
**Problem**: `@embroider/macros` caused build errors in Ember 5.x and complex configuration issues.

**Files modified**:
- `addon/components/validated-form.js` - Removed macro imports and `macroCondition` usage
- `addon/components/validated-button.js` - Removed macro imports and `macroCondition` usage
- `index.js` - Simplified to basic addon structure without macro configuration

**Benefits**:
- Eliminates build errors in Ember 5.x
- Simplifies component logic
- More predictable behavior
- Easier debugging

### 3. **Fixed Component Styling - No Custom Components Needed**
**Problem**: Removing macros broke CSS class application, causing forms to lose styling.

**Solution**: Updated default addon component templates to use application-specific CSS classes directly:

#### `addon/components/validated-input/label.hbs`
- Changed from macro-conditional classes to `class="Form-field-label"`
- Proper required field indicator: `<span class="required">*</span>`
- Removed `ember-view` class (auto-added by Ember)

#### `addon/components/validated-input/error.hbs`
- Changed from macro-conditional classes to `class="Alert Alert--error"`
- Proper error structure with nested `<div>` and `<br>` tags
- Matches application's expected HTML structure

#### `addon/components/validated-input/hint.hbs`
- Updated from `<small>` with macro classes to `<div class="Form-field-hint">`
- Consistent structure with other form field components
- Future-ready for when hints are used in the application

**Result**: No custom component configuration needed - default components now have correct styling baked in.

### 4. **Simplified index.js Configuration**
**Problem**: Complex macro-based configuration was causing initialization issues.

**Solution**: Streamlined to essential addon functionality:
- Removed `@embroider/macros` setup and configuration
- Added development logging for debugging
- Maintains custom component support through existing configuration
- Much simpler and more reliable initialization

### 5. **Ember 5.x Compatibility**
**Changes made for Ember 5.x compatibility**:
- Moved `ember-auto-import` from devDependencies to dependencies in addon's package.json
- Simplified `ember-addon` configuration in package.json
- Removed deprecated macro usage throughout components
- Added explicit addon path configuration in main app's package.json

## Configuration

### In main app's `package.json`:
```json
"ember-addon": {
  "paths": ["lib/ember-validated-form"]
}
```

**Note**: No ember-cli-build.js configuration needed - styling is now built into the default components.

## Component Resolution

The fixed `passed-or-default.js` now follows this resolution order:
1. **Args-passed components** (`@args[property]`)
2. **Custom components** (from ember-cli-build.js config, if configured)
3. **Default addon components** (using component path mapping) ← **Currently used**
4. **Null fallback** (graceful failure)

**Current behavior**: Uses default addon components with styling built-in.

## CSS Classes Applied

| Component | Class | Purpose |
|-----------|-------|---------|
| Label | `Form-field-label` | Main label styling |
| Required indicator | `required` | Red asterisk styling |
| Error | `Alert Alert--error` | Error message styling |
| Hint | `Form-field-hint` | Future hint styling |

## Benefits of Changes

1. ✅ **Stable Ember 5.x compatibility**
2. ✅ **Eliminated macro-related build errors**
3. ✅ **Fixed component resolution bugs**
4. ✅ **Restored proper form styling**
5. ✅ **Simplified debugging and maintenance**
6. ✅ **Future-proof architecture**

## Testing

The modified addon has been tested with:
- Form rendering and styling
- Component resolution (default and custom)
- Error message display
- Label and required field indicators
- Form submission and validation

All functionality working as expected in Ember 5.12 LTS.
