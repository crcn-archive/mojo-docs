var mojo = require("mojojs");

module.exports = mojo.View.extend({
  paper: require("./index.pc"),
  sections: {
    articles: {
      type: "list",
      source: "category.articles",
      modelViewClass: require("./article"),
      sort: function (a, b) {
        return a.get("model._id") > b.get("model._id") ? -1 : 1
      }
    }
  }
});