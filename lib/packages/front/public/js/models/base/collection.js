var bindable = require("bindable"),
outcome      = require("outcome");

function ModelCollection (source, application) {
  bindable.Collection.call(this, []);
  this.application = application;
}

module.exports = bindable.Collection.extend(ModelCollection, {
  createModel: function (data) {
    // OVERIDE ME
  },
  load: function (next) {
    if (!next) next = function () {}
    var self = this;
    this._load(outcome.e(next).s(function (source) {
      self.source(source.map(function (data) {
        return self.createModel(data);
      }));
    }));
    return this;
  },
  _load: function () {
    // OVERRIDE ME
  }
});