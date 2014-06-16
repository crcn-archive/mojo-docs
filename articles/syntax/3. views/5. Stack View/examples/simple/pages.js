var views = require("mojo-views");

module.exports = views.Stack.extend({
  state: "home",
  sections: {
    home: require("./home"),
    contact: require("./contact")
  },
  setPageState: function (state) {
    this.set("state", state);
  }
});
