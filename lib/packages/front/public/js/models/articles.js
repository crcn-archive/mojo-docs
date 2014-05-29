var BaseCollection = require("./base/collection");

module.exports = BaseCollection.extend({
  createModel: function (data) {
    return this.application.createModel("article", { data: data, collection: this });
  },
  _load: function (next) {
    this.application.service.get("/articles", next);
  }
});