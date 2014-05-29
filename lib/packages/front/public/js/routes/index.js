module.exports = function (app) {


  app.router.add({
    "/": {
      states: {
        main: "app"
      }
    }
  })
}