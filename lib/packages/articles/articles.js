var bindable = require("bindable"),
Loader       = require("./loader"),
Article      = require("./article"),
async        = require("async"),
outcome      = require("outcome"),
sift = require("sift"),
comerr = require("comerr");

function Articles (config) {
  bindable.Collection.call(this, []);
  this._loader = new Loader(config);
  this.load = async.memoize(this.load.bind(this));
}

bindable.Collection.extend(Articles, {
  findOne: function (query) {
    var tester = sift(query);
    return this._source.filter(function (article) {
      return tester.test(article.context());
    }).pop();
  },
  load: function (complete) {
    if (!complete) complete = function () {};
    this._loader.load(outcome.e(complete).s(this._reset.bind(this)));
  },
  _reset: function (source) {
    this.source(source.map(function (data) {
      return new Article(data);
    }))
  },
  toJSON: function () {
    return this.source().toJSON();
  }
});

module.exports = Articles;