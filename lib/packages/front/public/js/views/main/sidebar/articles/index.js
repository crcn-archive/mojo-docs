var mojo = require("mojojs");

var bindable = require("bindable");

var articles = new bindable.Collection([
  new bindable.Object({
    title: "Router Introduction",
    priority: 9999
  }),
  new bindable.Object({
    title: "Nested Views",
    priority: 9998
  }),
  new bindable.Object({
    title: "Templates",
    priority: 9997
  }),
  new bindable.Object({
    title: "View Bindings",
    priority: 9996
  })
]);


for (var i = 1000; i--;) {
  articles.push(new bindable.Object({ title: "blah", priority: i }))
}

module.exports = mojo.View.extend({
  paper: require("./index.pc"),
  bindings: {
    "models.articleFilter": function (filter) {
      this.set("sections.articles.filter", function (article) {

        if (filter.keyword) {
          if (!~article.get("title").toLowerCase().indexOf(filter.keyword.toLowerCase())) return false;
        }

        return true;
      });
    }
  },
  sections: {
    articles: {
      type: "list",
      source: articles,
      modelViewClass: require("./article.js"),
      sort: function (a, b) {
        return a.get("model.priority") > b.get("model.priority") ? -1 : 1
      }
    }
  }
});