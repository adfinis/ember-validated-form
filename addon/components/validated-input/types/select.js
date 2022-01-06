import { A as emberArray, isArray } from "@ember/array";
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
          url: "https://github.com/adfinis-sygroup/ember-validated-form/releases/tag/v5.1.0",
        }
      );
    }
  }

  get hasPreGroupedOptions() {
    return (
      this.args.options[0]?.groupName && isArray(this.args.options[0]?.options)
    );
  }

  get hasGrouping() {
    return this.hasPreGroupedOptions || this.args.groupLabelPath;
  }

  get optionGroups() {
    const groupLabelPath = this.args.groupLabelPath;
    if (!groupLabelPath) {
      return this.args.options;
    }
    const groups = emberArray();

    this.args.options.forEach((item) => {
      const label = get(item, groupLabelPath);

      if (label) {
        let group = groups.findBy("groupName", label);

        if (!group) {
          group = EmberObject.create({
            groupName: label,
            options: emberArray(),
          });

          groups.pushObject(group);
        }

        group.options.pushObject(item);
      } else {
        groups.pushObject(item);
      }
    });

    return groups;
  }

  findOption(target) {
    const targetPath = this.args.optionTargetPath;
    const valuePath = this.args.optionValuePath || targetPath;
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

      const foundOptions = options.filter((item) =>
        selectedValues.includes(`${valuePath ? item[valuePath] : item}`)
      );
      if (targetPath) {
        return foundOptions.map((item) => item[targetPath]);
      }
      return foundOptions;
    }

    //single select
    const foundOption = options.find(
      (item) => `${valuePath ? item[valuePath] : item.value}` === target.value
    );
    if (targetPath) {
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
