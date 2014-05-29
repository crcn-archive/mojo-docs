var mojo = require("mojojs");

module.exports = mojo.View.extend({
  paper: require("./index.pc"),
  sections: {
    pages: {
      type: "states",
      route: "content",
      views: [
        { class: require("./pages/article"), name: "article" },
        { class: require("./pages/hello"), name: "hello" }
      ]
    }
  }
});