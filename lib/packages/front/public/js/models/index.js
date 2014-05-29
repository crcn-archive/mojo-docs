var modelClasses = {
  article: require("./article"),
  articles: require("./articles")
}

module.exports = function (app) {

  for (var name in modelClasses) {
    app.registerModelClass(name, modelClasses[name]);
  }

  app.models.set("articles", app.createModel("articles").load());
}