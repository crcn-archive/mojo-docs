module.exports = function (app) {


  app.router.add({
    "/": {
      name: "home",
      states: {
        content: "hello"
      }
    },
    "/articles/:article": {
      name: "article",
      states: {
        content: "article"
      }
    }
  })
}