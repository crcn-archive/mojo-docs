Working with paperclip templates and mojo view controllers is pretty straight forward. Here's an example:


`views/hello.js`:

```javascript
var views = require("mojo-views"),
Application = require("mojo-application");

var app = new Application({
  plugins: [
    views,
    require("mojo-paperclip")
  ]
});

var HelloView = mojo.View.extend({
    paper: require("./hello.pc")
});


// create the view, and add to the DOM
var v = new HelloView();
$("#application").append(v.render());
```

`views/hello.pc`:

```javascript
hello {{name}}!
```

Notice that the `context` of the paperclip template is the view controller itself. Here's what you get:

<iframe width="100%" height="300" src="http://jsfiddle.net/BZA8K/110/embedded/result,js,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


## Working with Models

Models are set as a property on the view controller, which in turn gets displayed to the user through the template. Here's an example:


`views/hello.js`:

```javascript
var bindable = require("bindable");

var HelloView = mojo.View.extend({
  paper: require("./hello.pc")
});


// create the view with the person model, and add to the DOM
var v = new HelloView({
  person: new bindable.Object({ name: "Jeff" })
});

$("#application").append(v.render());
```

`views/hello.pc`:

```javascript
hello {{person.name}}
```

## Computed Properties

TODO

## Property Scope

templates are able to inherit properties from parent view controllers. For example:

```javascript

```
