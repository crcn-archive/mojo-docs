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
$(document.body).append(view.render());
```

### API

#### render()

renders the view

#### remove()

removed the view from the DOM

#### bubble(event[, data...])

bubbles an event up to the root view.

#### parent

the parent view

#### didCreateSection()

Called right after a section is created. This is an overridable method - do any sort of initial DOM manipulation here.

#### willRender()

called right before `.render()` is called on a view. It's also called before any decorators are initialized such as `bindings`, `events`, and `templates`.

#### didRender()

called right after `.render()` is called on the view. This method called after any decorators are initialized.

### Events

- `render` - emitted when the view is rendered
- `remove` - emitted when the view is removed
- `dispose` - emitted when the view is disposed. A disposed view should not be used anymore.
