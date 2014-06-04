BindableObjects are used primarily to synchronize information between Models, Templates, and Views. 

Two-way data binding means linking properties of two separate objects - when one changes, the other will automatically update with that change.  It enables much easier interactions between data models and UIs, among other uses outside of MVC.


### BindableObject Example

```javascript
var bindable = require("bindable");

var person = new bindable.Object({
  name: "craig",
  last: "condon",
  location: {
    city: "San Francisco"
  }
});

person.bind("location.zip", function(value) {
  // 94102
}).now();

//triggers the binding
person.set("location.zip", "94102");

//bind location.zip to another property in the model, and do it only once
person.bind("location.zip", { to: "zip", max: 1 }).now();

//bind location.zip to another object, and make it bi-directional.
person.bind("location.zip", { target: anotherModel, to: "location.zip", bothWays: true }).now();

//chain to multiple items, and limit it!
person.bind("location.zip", { to: ["property", "anotherProperty"], max: 1 }).now();


//you can also transform data as it's being bound
person.bind("name", {
  to: "name2",
  map: function (name) {
    return name.toUpperCase();
  }
}).now();
```

## API

#### value bindable.get(property)

Returns a property on the bindable object

```javascript
var bindable = new bindable.Object({ city: { name: "SF" } });

console.log(bindable.get("city"));      // { name: "SF" }
console.log(bindable.get("city.name")); // SF
```

#### bindable.set(property, value)

Sets a value to the bindable object

```javascript
var obj = new bindable.Object();
bindable.set("city.name", "SF");
console.log(obj.get("city.name")); // SF
```

#### bindable.setProperties(properties)

sets multiple properties on the bindable object

```javascript
var person = new bindable.Object();
person.setProperties({
  firstName: "Jon",
  lastName: "Doe"
});
console.log(person.get("firstName"), person.get("lastName")); // Jon Doe
```

#### bindable.has(property)

Returns true if the bindable object has a given property

```javascript
var obj = new bindable.Object({ count: 0, male: false, name: "craig" });

console.log(obj.has("count")); // true
console.log(obj.has("male")); // true
console.log(obj.has("name")); // true
console.log(obj.has("city")); // false
```

#### Object bindable.context()

returns the context of the bindable object.

```javascript
var context = {};
var obj     = new bindable.Object(context);

console.log(obj.context() == context); // true
```

#### listener bindable.on(event, callback)

adds a new listener to the bindable object

#### bindable.emit(event[,args...])

emits a new event

#### bindable.once(event, callback)

listens to one event

#### bindable.removeAllListeners([type])

returns all the listeners on the bindable object

#### Events

Bindable objects emit a few events:

- `change:*` - emitted when a property changes on the bindable object. E.g: `change:location.zip`.
- `change` - emitted when any property changes on the bindable object
- `watching` - emitted when a property is being watched
- `dispose` - emitted when `dispose()` is called on a bindable object

#### binding bindable.bind(from, options)

`options` - the options for the binding
  - `to` - the property to bind to. Can be a `string`, `array`, or `function`
  - `target` - the target bindable object. Default is self
  - `max` - max number of times to run the data-binding
  - `when` - tests the data-bound value before setting
  - `map` - transforms the data-bound value
  - `bothWays` - makes the data-binding bi-directional.

```javascript
var obj = new bindable.Object({ name: "craig" });

//bind to name2
obj.bind("name", "name2").now();

//same as above, different style.
obj.bind("name", { to: "name2" }).now();

// bind the name, but transform it to upper case
obj.bind("name", { to: "name2", map: function (name) {
  return name.toUpperCase();
}}).now();
```


#### binding.now()

Triggers the binding immediately if the bound property is defined. This is useful if you want to bind
two properties together, for instance:

```javascript
var person = new bindable.Object({ firstName: "jeff", lastName: "anderson" });

// triggers immediately, and computes first & last name into full name
person.bind("firstName, lastName", to: "fullName", map: function (firstName, lastName) {
  return firstName + " " + lastName;
}}).now();

console.log(person.get("fullName")); // jeff anderson
person.set("firstName", "liam"); // re-computes data-binding
console.log(person.get("fullName")); // liam anderson

```

#### binding.dispose()

Disposes a binding

```javascript
var person = new bindable.Object({ name: "jeff" });

var binding = person.bind("name", function (name) {
  // called ~ name = jeff
}).now();

binding.dispose();

person.set("name", "jake"); // binding not triggered
```
