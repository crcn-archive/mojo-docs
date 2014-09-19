var views = require("mojo-views");

module.exports = views.Base.extend({
  paper: require("./index.pc"),
  sections: {
    header: require("./header"),
    body: require("./body"),
    footer: require("./footer")
  }
});