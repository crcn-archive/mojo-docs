exports.require = ["config", "logger", "express"];
exports.load = function (config, logger, express) {
  var server = express(), port = config.get("http.port");
  server.listen(port);
  logger.info("starting HTTP server on port %d", port);
  return server;
}