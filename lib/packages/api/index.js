var vine = require("vine");

exports.require = ["http.server", "articles"];
exports.load = function (server, articles) {
  server.get("/api/articles", function (req, res) {
    res.send(vine.result(articles.source()));
  });
}