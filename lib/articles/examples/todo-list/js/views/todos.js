var mojo = require("mojojs");

module.exports = mojo.View.extend({

  /**
   */

  paper: require("./todos.pc"),

  /**
   */

  bindings: {
    "todos.length": "total",
    "todos.@each.complete": {
      "remaining": {
        "map": function (complete) {
          return complete.filter(function (r) {
            return !r;
          }).length;
        }
      }
    }
  },

  /**
   */

  archive: function () {
    this.get("todos").archive();
  },

  /**
   */

  addTodo: function () {
    if (!this.get("text")) return this.set("error", new Error("Please enter in some text!"));
    this.set("error", undefined);
    this.get("todos").create({ text: this.get("text") });
  },

  /**
   */

  sections: {
    todos: {
      type: "list",
      source: "todos",
      modelViewClass: require("./todo")
    }
  }
});