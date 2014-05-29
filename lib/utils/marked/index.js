var marked = require("marked"),
highlight = require("highlight.js");

marked.setOptions({
  highlight: function (code) {
    return highlight.highlightAuto(code).value;
  }
});

module.exports = marked;