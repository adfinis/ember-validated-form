import { getOwner } from "@ember/application";

export function scrollErrorIntoViewEnabled(target) {
  return getOwner(target).resolveRegistration("config:environment")[
    "ember-validated-form"
  ].scrollErrorIntoView;
}
