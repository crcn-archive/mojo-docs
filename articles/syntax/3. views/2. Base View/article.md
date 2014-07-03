Base views control what the user sees & does. They have all the same methods as bindable objects.

#### views.Base(properties, application)

- `properties` - properties set to the view controller
- `application` - the application instance

```javascript
var view = new views.Base({ name: "some-view" }, new Application());
console.log(view.name); // some-view
console.log(view.application); // application above
```

#### view.section

The [section](https://github.com/classdojo/loaf.js) which gets displayed to the user. This is basically a document fragment.

#### view.application

The application

#### view.render()

renders the view

```javascript
var view = new SomeView();
var documentFragment = view.render();
document.body.appendChild(documentFragment);
```

#### view.remove()

removed the view from the DOM

```javascript
var view = new SomeView();
document.body.appendChild(view.render());
view.remove(); // removes view from the document body
```

#### view.didCreateSection()

Called right after a section is created. Note that this method is called before `render()`, or any other view controller plugins.

```javascript
var views = require("mojo-views");

var SomeView = views.Base.extend({

  /**
   */

  didCreateSection: function () {
    this.section.append(document.createTextNode("Hello World!"));
  }
});


var view = new SomeView();

// append the document fragment created by the sub view
document.body.appendChild(view.render());
```

#### view.willRender()

called right before `.render()` is called on a view. It's also called before any decorators are initialized such as `bindings`, `events`, and `templates`.

#### view.didRender()

called right after `.render()` is called on the view.

#### view.didRemove()

called right after `.remove()` is called. At this point, the view is detached from the DOM, or parent elements.



### Events

- `render` - emitted when the view is rendered
- `remove` - emitted when the view is removed
- `dispose` - emitted when the view is disposed. A disposed view should not be used anymore.
