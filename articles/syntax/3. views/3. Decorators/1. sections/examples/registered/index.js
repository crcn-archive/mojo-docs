var Application = require("mojo-application");

module.exports = Application.extend({
  registerPlugins: function () {
    this.use(require("mojo-views"));
    this.use(require("./views"));
    this.use(require("mojo-paperclip"));
  },
  initialize: function (options) {
    options.element.appendChild(this.views.create("main").render());
  }
});