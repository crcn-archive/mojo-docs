Controls exactly what the user sees and does. View controllers are plugin-based - they don't come
with any special features out of the box, such as `templates`. This allows you to fully customize
exactly how view controllers behave. See `Decorators` to understand how to add / create plugins to views.

#### views.Base(properties, application)

- `properties` - properties set to the view controller
- `application` - the application instance

```javascript
var view = new views.Base();
view.section.append(document.createTextNode("Hello World!"));
document.body.append(view.render()); // displays 'Hello World!'
```

#### view.section

The document fragment which gets displayed to the user. Sections are groups of elements which are kept track by the view
controller. See [loaf](https://github.com/mojo-js/loaf.js) for a better understanding of how this works.

#### view.application

The main application - This is usually set in the constructor.

#### documentFragment view.render()

renders the view, and returns a document fragment.

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
