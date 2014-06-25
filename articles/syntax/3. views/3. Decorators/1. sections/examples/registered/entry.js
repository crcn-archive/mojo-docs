var Application = require("./index");

module.exports = function (element, application) {
  new Application().initialize({ element: element });
};