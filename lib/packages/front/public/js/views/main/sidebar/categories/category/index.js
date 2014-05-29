var mojo = require("mojojs");


module.exports = mojo.View.extend({
  paper: require("./index.pc"),
  bindings: {
    "model": "category"
  },
  toggleExpansion: function () {
    this.set("expanded", !this.get("expanded"));
  },
  sections: {
    articles: require("./articles")
  }
});