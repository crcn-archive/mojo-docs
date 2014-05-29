var bindable = require("bindable"),
titlecase    = require("titlecase");

function Article (data) {
  bindable.Object.call(this, this.deserialize(data));
}

function lowercase (value) {
  return value ? String(value).toLowerCase() : value;
}

bindable.Object.extend(Article, {
  toJSON: function () {
    return this.context();
  },
  deserialize: function (data) {
    return {
      _id: data._id,
      title: titlecase(data.title),
      tags: (data.tags || []).map(lowercase),
      category: lowercase(data.category || "general")
    }
  }
});

module.exports = Article;