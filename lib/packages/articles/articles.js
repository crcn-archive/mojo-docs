var bindable = require("bindable"),
Loader       = require("./loader"),
Article      = require("./article"),
async        = require("async"),
outcome      = require("outcome");

function Articles (config) {
  bindable.Collection.call(this, []);
  this._loader = new Loader(config);
  this.load = async.memoize(this.load.bind(this));
}

bindable.Collection.extend(Articles, {
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