var paperclip = require("paperclip"),
fs            = require("fs"),
marked        = require("../../marked");

module.exports = {

  extension: "md",
  
  transform: function (content, filepath) {
    return "module.exports = decodeURIComponent(\"" + encodeURIComponent(marked(content)) + "\");";
  }
};