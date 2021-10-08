import Component from "@glimmer/component";

import themedComponent from "../-private/themed-component";

export default class ValidatedButtonComponent extends Component {
  @themedComponent("validated-button/button") buttonComponent;
}
