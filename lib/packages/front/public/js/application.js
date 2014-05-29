var mojo = require("mojojs");



function MojoDocsApplication () {
  mojo.Application.call(this);

  this.use(require("mojo-mediator"));
  this.use(require("mojo-router"));

  this.use(require("./models"));
  this.use(require("./views"));
  this.use(require("./commands"));
  this.use(require("./routes"));
};

mojo.Application.extend(MojoDocsApplication, {
  initialize: function (placeholder) {
    var self = this;
    this.mediator.execute("bootstrap", function () {
      self.mainView = self.createView("main");
      $(placeholder).append(self.mainView.render());
    });
  }
});

module.exports = MojoDocsApplication;