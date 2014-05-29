var mojo = require("mojojs");

module.exports = mojo.View.extend({
  paper: require("./index.pc"),
  sections: {
    search       : require("./search"),
    allArticles  : require("./allArticles"),
    categories   : require("./categories")
  }
});