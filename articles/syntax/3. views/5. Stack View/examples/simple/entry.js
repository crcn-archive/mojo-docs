var PagesView = require("./main.js");

module.exports = function (element, application) {
  element.appendChild(new PagesView(null, application).render());
}
