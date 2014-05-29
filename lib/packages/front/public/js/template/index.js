var modifiers = require("./modifiers"),
pc = require("paperclip");

module.exports = function (app) {
  for (var name in modifiers) {
    pc.modifier(name, modifiers[name]);
  }
}