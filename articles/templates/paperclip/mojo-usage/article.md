Working with paperclip templates and mojo view controllers is pretty straight forward. Here's an example:


`views/hello.js`:

```javascript
var mojo = require("mojojs");

var HelloView = mojo.View.extend({
  paper: require("./hello.pc"),
  name: "World"
});

var v = new HelloView();
$("#application").append(v.render());
```

`views/hello.pc`:

```javascript
hello {{name}}!
```

TODO - jsfiddle

Notice that the `context` of the paperclip template is the view controller itself. 

## Working with Models

Models are set as a property on the view controller, which in turn gets displayed to the user through the template. Here's an example:


`views/hello.js`:

```javascript
var bindable = require("bindable");

var HelloView = mojo.View.extend({
  paper: require("./hello.pc")
});

var v = new HelloView({ person: new bindable.Object({ name: "Jeff" }) });
$("#application").append(v.render());
```

`views/hello.pc`:

```javascript
hello {{person.name}}
```

## 