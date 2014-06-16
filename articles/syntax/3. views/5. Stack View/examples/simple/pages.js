var views = require("mojo-views");

module.exports = views.Stack.extend({

  // initial state
  state: "home",

  // individual states
  sections: {
    home: require("./home"),
    contact: require("./contact")
  },

  // called by each state
  setPageState: function (state) {
    this.set("state", state);
  }
});
