var TodosView = require("./views/todos");
var Todos     = require("./models/todos");


module.exports = new TodosView({
  todos: new Todos([
    { text: "learn mojo", complete: true },
    { text: "build a mojo app" }
  ])
});