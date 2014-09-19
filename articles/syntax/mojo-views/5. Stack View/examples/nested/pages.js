var Application = require("mojo-application");


var MyApplicaton = Application.extend({
  registerPlugins: function () {
    this.use(require("mojo-views"));
    this.use(require("mojo-paperclip"));
    this.use(require("mojo-bootstrap"));
    this.use(require("mojo-router"));
    this.use(require("./views"));
    this.use(require("./routes"));
  },
  didBootstrap: function (options) {
    var mainView = this.views.create("main");
    this.router.bind("location.states", { target: mainView, to: "states" }).now();
    options.element.appendChild(mainView.render());
    this.router.redirect("login");
  }
})


module.exports = function (element) {
  var app = new MyApplicaton();
  app.initialize({ 
    element: element,
    useHistory: false
  });
}
