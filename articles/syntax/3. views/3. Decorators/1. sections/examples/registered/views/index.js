module.exports = function (app) {
  app.views.register({
    main: require("./main"),
    widget: require("./components/widget")
  })
}