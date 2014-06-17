var views = require("mojo-views");

var HomeView = views.Base.extend({
  paper: require("./home.pc")
});

var ContactView = views.Base.extend({
  paper: require("./contact.pc")
});

module.exports = views.Stack.extend({

  // initial state
  state: "home",

  // individual states
  sections: {
    home: HomeView,
    contact: ContactView
  },

  // called by each state
  setPageState: function (state) {
    this.set("state", state);
  }
});
