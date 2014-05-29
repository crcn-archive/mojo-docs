var mojo = require("mojojs"),
_        = require("lodash");

module.exports = mojo.View.extend({
  paper: require("./index.pc"),
  search: _.throttle(function () {
    this.application.mediator.execute("search", { keyword: this.keyword });
  }, 100)
});