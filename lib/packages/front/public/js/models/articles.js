var BaseCollection = require("./base/collection"),
outcome            = require("outcome");

function Articles (options, application) {
  BaseCollection.apply(this, arguments);
  this.category = this.options.category;
}

module.exports = BaseCollection.extend(Articles, {
  createModel: function (data) {
    return this.application.createModel("article", { data: data, collection: this });
  },
  _load: function (next) {
    this.application.service.get("/articles", { query: { category: this.category ? this.category.get("name") : null }}, next);
  }
});