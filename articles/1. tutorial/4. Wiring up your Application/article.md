You now have an application that's ready to be wired up. You might be noticing a bit of a pattern - allow me to spell it out. The philosophy behind writing mojo-based applications
is to only focus on what's needed immediately in the application, instead of focusing on the entire application structure. We first wrote out our HTML, then broke it out into separate
views bit-by-bit.

Now we're onto writing models & collections which provide a data-layer for our application. Models & Collections are what drive the application.
It's the information that's displayed to the user, and generally stuff that get's persisted to some storage.

Let's start by preparing our creating our todos model. Copy the following code into `app/models/todo.js`:

```javascript
var models = require("mojo-models");

module.exports = models.Base.extend({

  /**
   */

  toggleCompleted: function (value) {
    this.set("completed", arguments.length ? !!value : !this.completed);
    this.save();
  },

  /**
   */

  deserialize: function (data) {
    return {
      _id: data._id,
      text: data.text,
      completed: !!data.completed
    }
  },

  /**
   */

  serialize: function () {
    return {
      _id: this._id,
      text: this.text,
      completed: !!this.completed
    }
  }
});
```

Models are what represent data. In fact, all models have a `data` property which is `deserialized` as properties of the todo model.

Next, we'll need the todos collection. Copy the following code to `app/models/todos.js`:

```javascript
var models = require("mojo-models"),
ls         = require("./persist").localStorage;

module.exports = models.Collection.extend({

  /**
   */

  bindings: {

    // for each todo item, pull the `completed` property, and
    // compute the number of completed items as a property of this collection
    "@each.completed": {
      "numCompleted": {
        "map": function (completed) {
          return completed.filter(function (v) {
            return !!v;
          }).length;
        }
      }
    },

    // take the number of completed items, and length of this collection
    // to determine whether all todos are completed.
    "numCompleted, length": {
      "allCompleted": {
        "map": function (numCompleted, length) {
          return numCompleted === length;
        }
      }
    }
  },

  /**
   */

  toggleCompleted: function () {
    var self = this;
    var allCompleted = this.allCompleted;
    this.each(function (todo) {
      todo.toggleCompleted(!allCompleted);
    });
  },

  /**
   */

  clearCompleted: function () {
    for (var i = this.length; i--;) {
      var todo = this.at(i);
      if (todo.completed) {
        todo.remove();
      }
    }
  }
});
```

With the todos `model`, and `collection`, we can now wire it up with our application. 
