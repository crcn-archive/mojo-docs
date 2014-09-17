Operates similar to `models.Base`, but holds a collection of them.

### Example

```javascript
var models = require("mojo-models");

var Friends = models.Collection.extend({

  /**
   */

  virtuals: {
    // see models.Base for documentation
  },

  /**
   */

  createModel: function (options) {
    return this.application.models.create
  },

  /**
   */

  persist: {

    /**
     * called when model.load() is executed
     */

    load: function (onLoad) {

      // API load request here
      complete(null, [{
        firstName: "Craig",
        lastName: "Condon"
      }]);
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

var u = new Friends({
  data: [{
    firstName: "Jon",
    lastName: "Doe"
  }]
});

console.log(u.at(0).get("firstName"); //Jon

```

## API

### Collection(options, application)

- `options` - properties defined on the collection
- `application` - application running

### model.deserialize(data)

deserializes data and sets that data on the collection

### model.serialize()

alias to toJSON

## Virtuals

Operates similar to `models.Base` virtual properties.

## Persistence

Optional plugin that allows you to add persistence to models such as `load`, `save`, and `remove`.

### model.load(onLoad)

loads the collection. Note that `persist.load` must be defined.

### model.save(onSave)

saves the collection. Note that `persist.save` must be defined.

### model.remove(onRemove)

removes the collection. Note that `persist.remove` must be defined.
