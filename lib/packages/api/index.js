var vine = require("vine"),
sift = require("sift");

exports.require = ["http.server", "articles"];
exports.load = function (server, articles) {

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
  });

  server.get("/api/articles", function (req, res) {
    var tester = Object.keys(req.query).length ? sift(req.query) : { test: function () { return true } };
    res.send(vine.result(articles.source().filter(function (item) {
      return tester.test(item.context());
    })));
  });

  server.get("/api/articles/:article", function (req, res, next) {
    var article = articles.findOne({ _id: req.params.article });
    if (!article) return next();
    res.send(vine.result(article));
  });

  server.get("/api/articles/:article/script", function (req, res, next) {
    var article = articles.findOne({ _id: req.params.article });
    if (!article) return next();
    article.build(function (err, content) {
      if (err) return res.send(vine.error(err));
      res.send(vine.result(content));
    });
  })
}