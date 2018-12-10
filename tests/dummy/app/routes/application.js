import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default Route.extend({
  intl: service(),
  beforeModel() {
    /* NOTE: if you lazily load translations, here is also where you would load them via `intl.addTranslations` */
    this.intl.addTranslations("fr-FR", {
      some: {
        scope: {
          shapes: "les formes",
          triangle: "un triangle",
          square: "un carré",
          circle: "un cercle"
        }
      }
    });
    return this.intl.setLocale(["fr-FR"]);
  }
});
