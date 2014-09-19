var views = require("mojo-views"),
bindable  = require("bindable"),
Application = require("mojo-application");

var ForgotPasswordView = views.Base.extend({
  paper: require("./forgot.pc")
})

var LoginView = views.Base.extend({
  paper: require("./login.pc"),
  login: function () {
    this.set("error", undefined);
    if (this.username != "username" || this.password != "password") {
      return this.set("error", new Error("incorrect username / password"));
    }
    return this.application.router.redirect("home");
  }
});

var AuthView = views.Stack.extend({
  sections: {
    login: LoginView,
    forgot: ForgotPasswordView
  }
});

var HomeView = views.Base.extend({
  paper: require("./home.pc")
});

var ContactView = views.Base.extend({
  paper: require("./contact.pc")
})

var AppView = views.Stack.extend({
  sections: {
    home: HomeView,
    contact: ContactView
  }
});

var MainView = views.Stack.extend({
  name: "main",
  sections: {
    auth: AuthView,
    app: AppView
  }
});

module.exports = function (app) {
  app.views.register({
    main: MainView
  });
}