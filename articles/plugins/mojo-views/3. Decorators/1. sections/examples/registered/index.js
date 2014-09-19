var Application = require("mojo-application");

module.exports = Application.extend({
  plugins: [
    require("mojo-views"),
    require("./views"),
    require("mojo-paperclip")
  ],
  initialize: function (options) {
    options.element.appendChild(this.views.create("main").render());
  }
});
