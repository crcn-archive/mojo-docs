[mojo-application](https://github.com/classdojo/mojo-application) is your main entry point. It's not very complex - just some glue to help bootstrap
your application.

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

the [node factory](https://github.com/classdojo/nofactor.js) to use when creating elements. This allows us to run on multiple platforms.

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

#### application.registerPlugins()

called immediately after the application is created. This is where you should register your plugins.

```javascript
// same as above, but much cleaner.
var MyApplication = Application.extend({
  registerPlugins: function () {
    this.use(require("mojo-views"));
    this.use(function (app) {

    });
  }
});

var app = new MyApplication();
```

#### application.initialize(options)

Initializes the application. This is where you should pass-in your app config, including what element to attach to.

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
  registerPlugins: function () {
    this.use(require("mojo-views"));
    this.use(require("./views"));
  },
  didInitialize: function (options) {
    options.element.appendChild(this.views.create("main").render());
  }
});

var app = new MyApplication();
app.initialize({ element: document.body });
```



### Events

- `initialize` - emitted when the application is initialized
