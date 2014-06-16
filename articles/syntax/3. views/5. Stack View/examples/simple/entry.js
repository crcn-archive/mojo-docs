var PagesView = require("./pages.js");

module.exports = function (element, application) {
  element.appendChild(new PagesView(null, application).render());
}
