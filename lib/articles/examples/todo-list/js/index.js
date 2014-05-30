var mojo = require("mojojs");

module.exports = new mojo.View.extend({
  paper: require("./index.mpc"),
  sections: {
    example: require("./example")
  }
});