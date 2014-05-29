var Articles = require("./articles");

exports.require = ["config"];
exports.load = function (config) {
  var articles = new Articles(config);
  articles.load();
  return articles;
}