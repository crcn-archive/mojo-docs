var vine = require("vine"),
sift = require("sift");

exports.require = ["http.server", "articles"];
exports.load = function (server, articles) {
  server.get("/api/articles", function (req, res) {
    var tester = Object.keys(req.query).length ? sift(req.query) : { test: function () { return true } };
    res.send(vine.result(articles.source().filter(function (item) {
      return tester.test(item.context());
    })));
  });
  server.get("/api/categories", function (req, res) {
    var src = articles.source();
    var categories = [];
    for (var i = src.length; i--;) {
      var article = src[i], cat = String(article.get("category")).toLowerCase();
      if (!~categories.indexOf(cat)) {
        categories.push(cat);
      }
    }

    res.send(vine.result(categories.map(function(cat) {
      return {
        _id: cat,
        name: cat
      }
    })));
  })
}