module.exports = function (app) {

  app.models.bind("query.filter", { to: "filters.keyword", bothWays: true }).now();
  app.models.bind("params.article", { to: "currentArticle" }).now();

  app.router.param("article", function (location, next) {
    app.get("models.allArticles").findOne({ _id: location.params.get("article") }, next);
  });

  app.router.add({
    "/": {
      name: "home",
      states: {
        content: "hello"
      }
    },
    "/articles/:article": {
      name: "article",
      states: {
        content: "article"
      }
    }
  })
}