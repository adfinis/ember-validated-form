// BEGIN-SNIPPET quickstart-route.js
import Route from "@ember/routing/route";
import { tracked } from "@glimmer/tracking";

class Model {
  @tracked saved = false;

  save() {
    this.saved = true;
  }
}

export default class IndexRoute extends Route {
  model() {
    return new Model();
  }
}
// END-SNIPPET
