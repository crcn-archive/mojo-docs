Mojo Views are the C in [Model View Controller](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller). The View controller handles what the user sees, and any user
interactions. For example, when a user clicks a button (view), the button click is handled by the view controller, which might invoke some sort of action on the application, such as
a model, router, or command. Clicking an anchor link for instance gets sent to the view controller, which then interacts with the HTTP router to redirect to another application state.

The default view controller layer for Mojo is [mojo-views](https://github.com/classdojo/mojo-views). You can install it by plugging it into your main application, like so:

```javascript
var Application = require("mojo-application");
var app = new Application();
app.use(require("mojo-views")); // view controller plugin
```

View controllers are entirely plugin-based, meaning you can customize their behavior to suite your needs.  

### API

`mojo-views` will add a few methods to your application:

#### app.views.register(className, clazz)

Registers a view controller class.

- `className` - the class name to register
- `clazz` - the view controller class

```javascript
var views = require("mojo-views");

var MainView = views.Base.extend({

  /**
   */

  didCreateSection: function () {

    // always use the application node factory to ensure your application runs in the browser,
    // as well as Node.js - very important for unit tests!
    this.section.append(this.application.nodeFactory.createTextNode(this.get("message") || "Hello World!"));
  }
});

app.views.register("main", MainView);
```

#### app.views.create(className, properties)

Creates a new registered view.

- `className` - the registered class name
- `options` - passed as properties of the view controller

```javascript
var mainView = app.views.create("main", {
  message: "Waazaaap"
});
$(document.body).append(mainView.render()); // will display "Waazaaap" to the user

var mainView2 = app.views.create("main");
$(document.body).append(mainView.render()); // will display "Hello World!" to the user
```

#### app.views.decorator(decorator)

Registers a new plugin that gets attached to all view controllers that match the value returned in `getOptions`.

Decorators are useful if you want to extend the functionality of mojo-views, such as registering your own template engine. For example:

```javascript
// handlebars plugin
app.views.decorator({
  getOptions: function (view) {
    return view.handlebars;
  },
  decorate: function (view, template) {
    // do stuff with view
  }
});
```

Note that if `getOptions` returns `undefined`, then the decorator won't get used on the view controller.
