
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

### model.load(onLoad)

loads the model. Note that `persist.load` must be defined.

### model.save(onSave)

saves the model. Note that `persist.save` must be defined.

### model.remove(onRemove)

removes the model. Note that `persist.remove` must be defined.

## Virtuals

## Persistence
