var MainView = require("./index");

module.exports = function (element, application) {
  element.appendChild(new MainView(element, application).render());
};