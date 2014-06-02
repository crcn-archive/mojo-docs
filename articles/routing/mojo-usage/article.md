To use the default mojo.js router, you'll need to do a few things first:

1. register the routes plugin

```javascript
var app = new mojo.Application();
app.use(require("mojo-router"));
app.use(require("./routes"));
```

2. Create a routes file called `routes/index.js`, or similar:

```javascript
module.exports = function (app) {
  app.router.add({
    "/home": {
      main: "home"
    },
    "/contact": {
      main: "cnotact"
    }
  })
}
```

3. Define some pages:

```javascript

var HomeView = mojo.View.extend({
  paper: require("./home.pc")
});

var ContactView = mojo.View.extend({
  paper: require("./contact.pc")
});

var MainView = mojo.View.extend({
  sections: {
    pages: {
      type: "state",
      route: "main",
      views: [
        { class: HomeView, name: "home" },
        { class: ContactView, name: "contact" }
      ]
    }
  }
})
```

### Anchor Links
