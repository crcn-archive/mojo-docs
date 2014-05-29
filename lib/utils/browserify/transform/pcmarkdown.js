var paperclip = require("paperclip"),
fs            = require("fs"),
marked        = require("../../marked");

module.exports = {

  extension: "mpc",
  
  transform: function (content, filepath) {

    var blocks = content.match(/\{\{.*?\}\}/) || [],
    repl = "((PLACEHOLDER))";

    for (var i = blocks.length; i--;) {
      content = content.replace(blocks[i], repl);
    }

    var html = marked(content);

    while(~html.indexOf(repl)) {
      html = html.replace(repl, blocks.shift());
    }

    return paperclip.translator.parse(html);
  }
};