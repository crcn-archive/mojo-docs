Models, like views, are plugin-based, meaning you can customize how models behave based on the properties defined
in the class. You can also create your own plugins for models. By default, `mojo-models` come with a few plugins: `persist`,
`virtuals`, and `bindings`. Here's an basic example:

### Example

```javascript
var models = require("mojo-models");

var Person = models.Base.extend({

  /**
   * virtual properties are called on demand, and generally
   * used for data-bindings.
   */

  virtuals: {
    "friends": function (onLoad) {
      this.application.models.create("friends", {
        person: this
      }).load(complete);
    }
  },

  /**
   */

  persist: {

    /**
     * called when model.load() is executed
     */

    load: function (onLoad) {

      // API load request here
      complete(null, {
        firstName: "Craig",
        lastName: "Condon"
      });
    },

    /**
     * called when model.save() is executed.
     */

    save: function (onSave) {
      // API save call here
    },

    /**
     */

    remove: function (onRemove) {
      // API remove call here
    }
  },

  /**
   * deserializes the .data property on the model, and
   * assigns the returned properties as properties on the model itself
   */

  deserialize: function (data) {
    return {
      fullName: data.firstName + " " + data.lastName,
      firstName: data.firstName,
      lastName: data.lastName
    }
  },

  /**
   * serializes data back into data, this is called on .toJSON()
   */

  serialize: function () {
    return {
      firstName: this.firstName,
      lastName: this.lastName
    }
  }

  /**
   */

  didSave: function () {
    // called when the model has saved
  },

  /**
   */

  didRemove: function () {
    // called when the model has been remobed
  }
});

var u = new Person({
  data: {
    firstName: "Jon",
    lastName: "Doe"
  }
});

console.log(u.fullName); // Jon Doe

```

## API


## Virtuals

Virtual properties allow you to define properties that are loaded on demand. This is especially
useful when data-binding models to views. 

## Persistence

Decorator that allows you to add persistence to models such as `load`, `save`, and `remove`.


### model.load(onLoad)

loads the model. Note that `persist.load` must be defined.

### model.save(onSave)

saves the model. Note that `persist.save` must be defined.

### model.remove(onRemove)

removes the model. Note that `persist.remove` must be defined.
