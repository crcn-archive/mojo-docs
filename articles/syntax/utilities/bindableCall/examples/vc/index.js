var views     = require("mojo-views"),
bindableCall  = require("bindable-call");

module.exports = views.Base.extend({

  /**
   */

  paper: require("./index.pc"),

  /**
   * set default properties for input fields
   */

  username: "user",
  password: "pass",

  /**
   * hide loginRequest properties, and data-bind everything
   * to this view controller
   */

  bindings: {
    "loginRequest.error"   : "error",
    "loginRequest.success" : "success",
    "loginRequest.loading" : "loading"
  },

  /**
   * makes a login request
   */

  login: function () {
    this.set("loginRequest", bindableCall(login, this));
  }
});


function login (credentials, complete) {

  // simulate loading...
  if (credentials.username !== "user" || credentials.password != "pass") {
    return setTimeout(complete, 500, new Error("incorrect username / password"));
  }

  setTimeout(complete, 500);
}