var bindable = require("bindable");

function Model (options, application) {
  bindable.Object.call(this, options.data);
  this.collection = options.collection;
  this.application = application;
  this._setupVirtuals();
}

module.exports = bindable.Collection.extend(Model, {
  _setupVirtuals: function () {
    
  }
});