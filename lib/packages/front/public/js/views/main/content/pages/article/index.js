var mojo = require("mojojs");

module.exports = mojo.View.extend({
  paper: require("./index.mpc"),
  bindings: {
    "models.currentArticle": "article"
  }
});