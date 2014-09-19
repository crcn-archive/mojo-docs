var views = require("mojo-views");

module.exports = views.Stack.extend({

  /**
   * the default state
   */

  state: "home",

  /**
   * each page we want to show
   */

  sections: {
    home: require("./home"),
    contact: require("./contact")
  },

  /**
   * called by each sub-component. Note that just
   * like JavaScript scope, this property is *inherited*
   * by all sub-components that need it.
   */

  setPageState: function (state) {
    this.set("state", state);
  }
});
