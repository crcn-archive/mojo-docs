exports.require = ["http.server", "express", "browserify-middleware", __dirname + "/transform"];
exports.load = function (server, express, browserify, transform) {
  server.use(express.static(__dirname + "/public"));
  server.get("/js/app.bundle.js", browserify(__dirname + "/public/js/index.js", { transform: transform, extensions: transform.extensions }));
}