exports.require = ["http.server", "express"];
exports.load = function (server, express) {
  server.use(express.static(__dirname + "/public"));
}