var mojo = require("mojojs");

module.exports = mojo.View.extend({
  paper: require("./index.pc"),
  bindings: {
    "models.filters.keyword": function (keyword) {

      var filter = { keyword: keyword };
      this.set("sections.articles.filter", function (article) {

        if (filter.keyword) {
          var keyword = filter.keyword.toLowerCase();

          if (~article.get("title").toLowerCase().indexOf(keyword)) return true;
          if (~article.get("tags").join(" ").indexOf(keyword)) return true;
          if (~article.get("category").indexOf(keyword)) return true;

          return false;
        }

        return true;
      });
    }
  },
  sections: {
    articles: {
      type: "list",
      source: "models.allArticles",
      modelViewClass: require("./article.js"),
      sort: function (a, b) {
        return a.get("model._id") > b.get("model._id") ? -1 : 1
      }
    }
  }
});