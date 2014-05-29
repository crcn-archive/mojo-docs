var mojo = require("mojojs");

module.exports = mojo.View.extend({
  paper: require("./index.pc"),
  sections: {
    categories: {
      type: "list",
      source: "models.articleCategories",
      modelViewClass: require("./category"),
      sort: function (a, b) {
        return a.get("model.name") > b.get("model.name") ? -1 : 1
      }
    }
  }
});