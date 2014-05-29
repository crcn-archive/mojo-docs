
var browserify = require("browserify-middleware"),
express        = require("express"),
transform      = require("./transform");

exports.require = ["http.server"];
exports.load = function (server) {
  installAppCompiler(server);
  installLessCompiler(server);
};

function installAppCompiler (server) {
  server.use(express.static(__dirname + "/public"));
  server.get("/js/app.bundle.js", browserify(__dirname + "/public/js/index.js", { transform: transform, extensions: transform.extensions }));
}


var less = require("less"),
glob     = require("glob"),
fs       = require("fs");

function installLessCompiler (server) {
  var cssParser = new less.Parser();
  server.get("/css/app.css", function (req, res) {
    var lessFiles = glob.sync(__dirname + "/public/**/*.less"),
    buffer  = [];

    for (var i = lessFiles.length; i--;) {
      var path = lessFiles[i];
      if (fs.lstatSync(path).isDirectory()) continue;
      buffer.push(fs.readFileSync(path, { encoding: "utf8" }));
    }


    cssParser.parse(buffer.join("\n"), function (err, tree) {

      if (err) return res.send(JSON.stringify(err));

      res.setHeader("Content-Type", "text/css");
      res.send(tree.toCSS());
    })
  });
}