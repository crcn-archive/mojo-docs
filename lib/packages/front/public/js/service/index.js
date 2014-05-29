var superagent = require("superagent"),
comerr         = require("comerr"),
path           = require("path");

module.exports = function (app) {
  app.service = {
    get: function (pathname, options, complete) {

      if (arguments.length === 2) {
        complete = options;
        options = {};
      }

      superagent.
      get(path.join("api", pathname)).
      query(options.query || {}).
      end(function (err, response) {
        if (err) return complete(err);
        if (response.status !== 200) {
          return complete(comerr.fromCode(response.status));
        }
        complete(null, response.body.result);
      });
    }
  };
}