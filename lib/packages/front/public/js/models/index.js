var modelClasses = {
  article    : require("./article"),
  articles   : require("./articles"),
  category   : require("./category"),
  categories : require("./categories")
}

module.exports = function (app) {

  for (var name in modelClasses) {
    app.registerModelClass(name, modelClasses[name]);
  }

  app.models.set("allArticles", app.createModel("articles").load());
  app.models.set("articleCategories", app.createModel("categories").load());
}