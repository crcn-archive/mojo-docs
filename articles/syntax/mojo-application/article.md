[mojo-application](https://github.com/mojo-js/mojo-application) is your main entry point. It's not very complex - just some glue to help bootstrap
your application.

## Core API

#### Application(options)

- `options`
  - `nodeFactory` - the node factory to use when creating elements. This is automatically set when undefined.

```javascript
// node factory
var nofactor = require("nofactor"),
Application  = require("mojo-application");

// use the DOM node factory - meant for the browser
var app = new Application({ nodeFactory: nofactor.dom });

// use the string node factory - meant for node.js
var app = new Application({ nodeFactory: nofactor.string });

// use the default node factory - automatically identified based on platform.
var app = new Application({ nodeFactory: nofactor["default"] });
```

#### application.nodeFactory

the [node factory](https://github.com/mojo-js/nofactor.js) to use when creating elements. This allows us to run on multiple platforms.

#### application.plugins

Array of plugins to use in the application.

```javascript
var Application = require("mojo-application");

var MyApplication = Application.extend({
  plugins: [
    require("mojo-router"),
    require("mojo-models")
    require("mojo-views"),
    require("mojo-paperclip"),
    require("./routes"),
    require("./models"),
    require("./views")
  ]
});

var app = new MyApplication();
```

#### application.use(plugin)

registers a plugin to the application.

```javascript
var Application = require("mojo-application");
var app = new Application();

// load in a third-party plugin
app.use(require("mojo-views"));

// or pass in a function
app.use(function (app) {
  // do stuff with the application
});
```

#### application.initialize(options)

Initializes the application. This is where you should pass-in your app config, including what element to attach to.

Note that an exception will be thrown if initialize is called more than once.

```javascript
var app = new MyApplication();
app.once("initialize", function (options) {
  console.log(options.element);
});

app.initialize({ element: document.body });
```

#### application.willInitialize(options)

called immediately before initializing your application.

#### application.didInitialize(options)

called immediately after initializing your application. Good place to start your application.

```javascript
var MyApplication = Application.extend({
  plugins: [
    require("mojo-views"),
    require("./views")
  ],
  didInitialize: function (options) {
    options.element.appendChild(this.views.create("main").render());
  }
});

var app = new MyApplication();
app.initialize({ element: document.body });
```

### Core Events

- `initialize` - emitted when the application is initialized







