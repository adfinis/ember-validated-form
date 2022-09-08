import { deprecate } from "@ember/debug";
import EmberObject, { action, get } from "@ember/object";
import Component from "@glimmer/component";

/**
 * This component is heavily inspired by the ember-one-way-select addon.
 * https://github.com/DockYard/ember-one-way-select
 * Our implementation is slightly simpler, since it does not support
 * the block syntax for options.
 */

export default class SelectComponent extends Component {
  constructor(...args) {
    super(...args);

    if (this.args.includeBlank) {
      deprecate(
        "The `includeBlank` property is deprecated. Please use `prompt` instead.",
        false,
        {
          id: "ember-validated-form:NoMoreincludeBlank",
          until: "6.0.0",
          since: "5.1.0",
          url: "https://github.com/adfinis/ember-validated-form/releases/tag/v5.1.0",
          for: "ember-validated-form",
        }
      );
    }
  }

  get hasPreGroupedOptions() {
    return (
      this.args.options[0]?.groupName &&
      Array.isArray(this.args.options[0]?.options)
    );
  }

  get hasGrouping() {
    return this.hasPreGroupedOptions || this.args.groupLabelPath;
  }

  get normalizedOptions() {
    // normalize options to common data structure, only for rendering
    return this.args.options.map((opt) => this.normalize(opt));
  }

  normalize(option) {
    if (typeof option !== "object") {
      return { id: option, label: option };
    }
    const valuePath = this.args.optionValuePath ?? this.args.optionTargetPath;
    const labelPath = this.args.optionLabelPath;
    return {
      id: valuePath ? option[valuePath] : option.id,
      label: labelPath ? option[labelPath] : option.label,
    };
  }

  get optionGroups() {
    const groupLabelPath = this.args.groupLabelPath;
    if (!groupLabelPath) {
      return this.args.options;
    }
    const groups = [];

    this.args.options.forEach((item) => {
      const label = get(item, groupLabelPath);

      if (label) {
        let group = groups.find((group) => group.groupName === label);

        if (!group) {
          group = EmberObject.create({
            groupName: label,
            options: [],
          });

          groups.push(group);
        }

        group.options.push(this.normalize(item));
      } else {
        groups.push(item);
      }
    });

    return groups;
  }

  findOption(target) {
    const targetPath = this.args.optionTargetPath;
    const valuePath = this.args.optionValuePath || targetPath;

    const getValue = (item) => {
      if (valuePath) {
        return String(item[valuePath]);
      }
      if (typeof item === "object") {
        return String(item.id);
      }
      return String(item);
    };

    let options = this.args.options;

    //flatten pre grouped options
    if (this.hasPreGroupedOptions) {
      options = options.flatMap((group) => group.options);
    }

    // multi select
    if (this.args.multiple) {
      const selectedValues = Array.prototype.filter
        .call(target.options, (option) => option.selected)
        .map((option) => option.value);

      const foundOptions = options.filter((item) => {
        return selectedValues.includes(getValue(item));
      });
      if (targetPath) {
        return foundOptions.map((item) => item[targetPath]);
      }
      return foundOptions;
    }

    //single select
    const foundOption = options.find((item) => getValue(item) === target.value);

    // If @promptIsSelectable is set to true, foundOption in this case will be undefined.
    if (targetPath && foundOption) {
      return foundOption[targetPath];
    }
    return foundOption;
  }

  @action
  onUpdate(event) {
    if (this.args.update) {
      this.args.update(this.findOption(event.target));
    }
  }

  @action
  onBlur(event) {
    if (this.args.setDirty) {
      this.args.setDirty(event.target.value);
    }
  }
}
