var packages = require("packages"),
bindable     = require("bindable"),
Logger       = require("./logger");

packages().
require({
  config: new bindable.Object({
    http: {
      port: 8081
    },
    articlesPath: __dirname + "/../articles/**/package.json"
  }),
  logger: new Logger({
    level: Logger.levels.ALL
  })
}).
require(__dirname + "/packages").
load();