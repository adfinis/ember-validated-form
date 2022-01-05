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

  @action
  onUpdate(event) {
    if (this.args.update) {
      this.args.update(event.target.value);
    }
  }

  @action
  onBlur(event) {
    if (this.args.setDirty) {
      this.args.setDirty(event.target.value);
    }
  }
}
