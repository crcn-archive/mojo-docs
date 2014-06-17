module.exports = function (app) {
  app.router.add({
    "/contact": {
      name: "contact",
      states: {
        main: "app",
        app: "contact"
      }
    },
    "/home": {
      name: "home",
      states: {
        main: "app",
        app: "home"
      }
    },
    "/": {
      name: "login",
      states: {
        main: "auth",
        auth: "login"
      }
    },
    "/logout": {
      name: "logout",
      enter: function (location, next) {
        // do logout stuff
        next();
      },
      redirect: "login"
    },
    "/forgot": {
      name: "forgot",
      states: {
        main: "auth",
        auth: "forgot"
      }
    }
  });
}