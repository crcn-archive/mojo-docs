var BaseCollection = require("./base/collection"),
outcome            = require("outcome");

function Categories (options) {
  this.articles = options.articles;
  BaseCollection.apply(this, arguments);
}

module.exports = BaseCollection.extend({
  createModel: function (data) {
    return this.application.createModel("category", { data: data, collection: this });
  },
  _load: function (next) {
    this.application.service.get("/categories", next);
  }
});