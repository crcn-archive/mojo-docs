var BaseModel = require("./base/model"),
outcome       = require("outcome"),
mojo          = require("mojojs");

module.exports = BaseModel.extend({
  virtuals: {
    script: function (complete) {
      this.application.service.get("/articles/" + this.get("_id") + "/script", outcome.e(complete).s(function (script) {
        var fn = new Function("return " + script);
        var ret = fn();
        if (ret.render) return complete(null, ret);
        // default is paperclip template
        complete(null, new mojo.View({ paper: ret }));
      }));
    }
  }
});