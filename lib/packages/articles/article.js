var bindable = require("bindable");

function Article (data) {
  bindable.Object.call(this, data);
}

bindable.Object.extend(Article, {
  toJSON: function () {
    return this.context();
  }
});

module.exports = Article;