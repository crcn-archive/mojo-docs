var BaseModel = require("./base/model");

module.exports = BaseModel.extend({
  virtuals: {
    "articles": function (next) {
      this.application.createModel("articles", { category: this }).load(next);
    }
  }
});