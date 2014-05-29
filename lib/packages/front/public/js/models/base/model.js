var bindable = require("bindable"),
virtualize   = require("./decor/virtualize");

function Model (options, application) {
  bindable.Object.call(this, options.data);
  this.collection = options.collection;
  this.application = application;
  virtualize(this);
}

module.exports = bindable.Collection.extend(Model, {
  _setupVirtuals: function () {
    
  }
});