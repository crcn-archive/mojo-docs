var bindable = require("bindable"),
outcome      = require("outcome"),
virtualize   = require("./decor/virtualize"),
sift         = require("sift"),
comerr       = require("comerr");

function ModelCollection (options, application) {
  if (!options) options = {};
  this.options = options;
  bindable.Collection.call(this, []);
  this.application = application;
  if (options.data) {
    this.setProperties(options.data);
  }
  virtualize(this);
}

module.exports = bindable.Collection.extend(ModelCollection, {
  find: function (query, next) {
    var self = this;
    var tester = sift(query);
    this.load(outcome.e(next).s(function () {
      next(null, self._source.filter(function (item) {
        return tester.test(item.context());
      }));
    }));
  },
  findOne: function (query, next) {
    this.find(query, outcome.e(next).s(function (items) {
      if (!items.length) return next(comerr.notFound());
      return next(null, items.shift());
    }));
  },
  reload: function (next) {
    var self = this;
    this._load(outcome.e(next).s(function (source) {
      self.source(source.map(function (data) {
        return self.createModel(data);
      }));
      next(null, self);
      self._loaded = true;
      self.emit("loaded", null, this);
    }));
    return this;
  },
  load: function (next) {
    if (!next) next = function () {};
    if (this._loaded) return next(null, this);
    if (this._loading) return this.once("loaded", next);
    this._loading = true;
    return this.reload(next);
  },
  createModel: function (data) {
    // OVERIDE ME
  },
  _load: function () {
    // OVERRIDE ME
  }
});