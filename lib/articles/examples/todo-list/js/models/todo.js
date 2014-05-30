var bindable = require("bindable");


function Todo (data) {
  bindable.Object.call(this, data);
}

bindable.Object.extend(Todo, {

});

module.exports = Todo;