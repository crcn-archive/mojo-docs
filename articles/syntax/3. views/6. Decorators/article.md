Decorators allow you to customize the behavior of view controllers. They are what makeup view controllers.

### Sections

Sections allow you to specify nested views. They make it easy to break your application views into smaller,
more manageable chunks.

```javascript
// main.js
var MainView = views.Base.extend({

  /**
   */

  paper: require("./main.pc"),

  /**
   */

  sections: {
    header: HeaderView,
    body: BodyView,
    footer: FooterView
  }
});
```

Sections are typically used with templates. In the example above, we might have a template like so:

```html
<!-- main.pc -->

<div class="application">
  {{ html: sections.header }}
  {{ html: sections.body   }}
  {{ html: sections.footer }}
</div>
```

### Bindings

Bindings allow you to compute properties on your view controller.

```javascript
var MainView = views.Base.extend({
  bindings: {
    "firstName, lastName": {
      "fullName": {
        "map": function (firstName, lastName) {
          return firstName + " " + lastName;
        }
      }
    }
  }
});

var mainView = new MainView({ firstName: "Jake", lastName: "Anderson" });
console.log(mainView.get("fullName")); // undefined
mainView.render();
console.log(mainView.get("fullName")); // Jake Anderson
```

### Custom

TODO
