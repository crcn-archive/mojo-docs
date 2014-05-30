var bindable = require("bindable"),
Todo         = require("./todo");

function Todos (source) {
  bindable.Collection.call(this, []);
  if (source) this._reset(source);
}

bindable.Collection.extend(Todos, {
  archive: function () {
    for (var i = this._source.length; i--;) {
      var todo = this._source[i];
      if (todo.get("complete")) {
        console.log("SPL")
        this.splice(i, 1);
      }
    }
  },
  _reset: function (source) {
    var self = this;
    this.source(source.map(function (data) {
      return new Todo(data);
    }))
  },
  create: function (data) {
    var todo = new Todo(data);
    this.push(todo);
    return todo;
  }
});

module.exports = Todos;