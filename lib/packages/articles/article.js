var bindable = require("bindable"),
path         = require("path"),
titlecase    = require("titlecase"),
transform    = require("../../utils/browserify/transform"),
browserify   = require("browserify"),
outcome      = require("outcome");

function Article (data) {
  this._mainPath = data.mainPath;
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
      _id      : data._id,
      path     : path.dirname(data.pkgPath).split("lib").pop(),
      title    : titlecase(data.title),
      tags     : (data.tags || []).map(lowercase),
      category : lowercase(data.category || "general"),
      main     : data.main
    }
  },
  build: function (complete) {
    if (!complete) complete = function () { };
    if (!this._mainPath) return complete(new Error("no main path"));
    var b = browserify(this._mainPath);
    b.transform(transform);
    b.bundle(outcome.e(complete).s(function (script) {
      complete(null, "(function(){ var s = " + script + "; return s(1); })();")
    }));
  }
});

module.exports = Article;