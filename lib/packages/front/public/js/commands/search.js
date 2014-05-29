module.exports = {
  "search": function (message, next) {
    var app = message.mediator.application;
    app.models.set("articleFilter", {
      keyword: message.data.keyword
    })
  }
}