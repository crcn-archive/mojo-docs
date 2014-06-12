Base views control what the user sees & does. They're the base class for all view controllers including `states`, and `lists`.

The best way to create a view is to first create a sub-class, then instantiate it. For example:

```javascript
var views = require("mojo-views");

var SomeView = views.extend({

  /**
   * sections are the "View" in MVC. They're what the user sees.
   * In this example, append "Hello World" text to the section.
   */

  didCreateSection: function () {
    this.section.append(document.createTextNode("Hello World!"));
  }
});


var view = new SomeView();

// append the document fragment created by the sub view
document.body.appendChild(view.render());
```

### API

#### render()

renders the view

```javascript
var view = new SomeView();
var documentFragment = view.render();
document.body.appendChild(documentFragment);
```

#### remove()

removed the view from the DOM

```javascript
var view = new SomeView();
document.body.appendChild(view.render());
view.remove(); // removes view from the document body
```

#### didCreateSection()

Called right after a section is created. This is an overridable method - do any sort of initial DOM manipulation here.

```javascript
var SomeView = views.Base.extend({
  didCreateSection: function () {
    // do stuff immediately after creating section
  }
});
```

#### willRender()

called right before `.render()` is called on a view. It's also called before any decorators are initialized such as `bindings`, `events`, and `templates`.

```javascript
var SomeView = views.Base.extend({
  willRender: function () {
    // do stuff right before rendering the view
  }
});
```

#### didRender()

called right after `.render()` is called on the view. This method called after any decorators are initialized.

```javascript
var SomeView = views.Base.extend({
  didRender: function () {
    // do stuff immediately after rendering
  }
});
```

#### didRemove()

called right after `.remove()` is called. At this point, the view is detached from the DOM, or parent elements.

```javascript
var SomeView = views.Base.extend({
  didRemove: function () {
    // do stuff immediately after removing from the DOM, or parent elements.
  }
});
```

### Events

- `render` - emitted when the view is rendered
- `remove` - emitted when the view is removed
- `dispose` - emitted when the view is disposed. A disposed view should not be used anymore.
