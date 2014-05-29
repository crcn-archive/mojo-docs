var protoclass = require("protoclass"),
_              = require("lodash");

function Virtualize (model) {
  this._model    = model;
  this._virtuals = model.virtuals || {};
  this._loading  = {};

  this._model.on("watching", _.bind(this._getVirtual, this));
}

protoclass(Virtualize, {
  _getVirtual: function (propertyPath) { 
    var property = propertyPath[0];
    if (!this._virtuals[property] || this._loading[property] || this._model.has(property)) return;
    this._loading[property] = true;
    var self = this;
    this._virtuals[property].call(this._model, function (err, value) {
      self._loading[property] = false;
      if (err) return;
      self._model.set(property, value);
    })
  }
});

module.exports = function (model) {
  new Virtualize(model);
};