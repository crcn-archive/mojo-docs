Let's first write the HTML & CSS. First download the [CSS styles](https://raw.githubusercontent.com/classdojo/mojo-todomvc-example/master/build/style.css) to `build/style.css`.


Next, let's write all the HTML necessary for the todo app. Copy all this stuff into `views/main/index.pc`:

```html
<section id="todoapp">
  <header id="header">
    <h1>todos</h1>
    <input type="text" id="new-todo" placeholder="What needs to be done?" />
  </header>

  <section id="main">
    <ul id="todo-list">
      <li class="completed">
        <input type="checkbox" class="toggle" />
        <label>Wash Dog</label><button class="destroy"></button>
      </li>
      <li>
        <input type="checkbox" class="toggle" />
        <label>Clean Car</label><button class="destroy"></button>
      </li>
    </ul>

    <input type="checkbox" id="toggle-all" />
  </section>

  <footer id="footer">
    <span id="todo-count">
      <strong>2</strong> todos left
    </span>
    <ul id="filters">
      <li>
        <a href="all" class="selected">All</a>
      </li>
      <li>
        <a href="active">Active</a>
      </li>
      <li>
        <a href="completed">Completed</a>
      </li>
    </ul>

    <button id="clear-completed">
      Clear completed (1)
    </button>
  </footer>
</section>

<footer id="info">
  <p>Double-click to edit a todo</p>
</footer>
```

Go ahead and run `npm start` on the project if you haven't already, and then open `http://localhost:8085` in your browser. You should see this:

![Alt screenshot](https://cloud.githubusercontent.com/assets/757408/3209463/7960affa-ee70-11e3-9119-c4581cf6e5f9.png)

Now comes the fun part. After we have *all* the HTML necessary for the component we're trying to build, we can start breaking that HTML into smaller components. Let's start
with the header. First copy the following code into `views/main/header/index.js`:

```javascript
var views = require("mojo-views");
module.exports = views.Base.extend({
  paper: require("./index.pc")
});
```

Notice `require("./index.pc")` - this is derived from `node.js`. Basically, we're *requiring* a file located in the same directory of the view controller. This happens to be
the template which gets displayed to the user. The term `paper` is terminology used for the template engine `paperclip`. Whereas `paper` is the template, and `clips` are the
data-bindings. `paper: require("./index.pc")` is basically saying: "load `index.pc` from the same directory as `index.js`, and use that as a paperclip template".

`module.exports` is also derived from `node.js`, and exposes your view controller so it can be used elsewhere.

Next, copy the following HTML from `views/main/index.pc` into `views/main/header/index.pc`:

```javascript
<header id="header">
  <h1>todos</h1>
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
</header>
```

At this point, your folder structure should look something like this:

```bash
views/
  main/
    index.js
    index.pc
    header/
      index.js
      index.pc
```


We're not actually done yet. We still need to `require` our new header view controller. So how do we do that? Easy - just copy the following chunk of code into `views/main/index.js`:

```javascript
var views = require("mojo-views");

module.exports = views.Base.extend({
  paper: require("./index.pc"),
  sections: {
    header: require("./header")
  }
});
```

`Sections` are nice little helpers which allow you to specify sub-views in your view controller. They're great for breaking components into smaller, more manageable chunks of code.

Next, we'll need to modify the main template again. Copy the following chunk of code into `views/main/index.pc`:

```html
<section id="todoapp">

  {{ html: sections.header }}

  <section id="main">
    <ul id="todo-list">
      <li class="completed">
        <input type="checkbox" class="toggle" />
        <label>Wash Dog</label><button class="destroy"></button>
      </li>
      <li>
        <input type="checkbox" class="toggle" />
        <label>Clean Car</label><button class="destroy"></button>
      </li>
    </ul>

    <input type="checkbox" id="toggle-all" />
  </section>

  <footer id="footer">
    <span id="todo-count">
      <strong>2</strong> todos left
    </span>
    <ul id="filters">
      <li>
        <a href="all" class="selected">All</a>
      </li>
      <li>
        <a href="active">Active</a>
      </li>
      <li>
        <a href="completed">Completed</a>
      </li>
    </ul>

    <button id="clear-completed">
      Clear completed (1)
    </button>
  </footer>
</section>

<footer id="info">
  <p>Double-click to edit a todo</p>
</footer>
```


Notice `{{ html: sections.header }}`. This block specifies where our header should go in the template file. Basically, view controllers do exactly as their name suggests - they
control exactly what the user sees, so it makes sense to let the view controller specify exactly what sub-views should be displayed to the user.

After adding the `header section` in the template, go ahead and refresh the browser. Your todo application should look exactly the same. The only difference is that `header` is specified
in another sub-component.

Now let's move onto the `todos` sub-component. Copy the following code `views/main/todos/index.js`:

```javascript
var views = require("mojo-views"),
bindable  = require("bindable");

module.exports = views.Base.extend({

  /**
   */

  paper: require("./index.pc"),

  /**
   * temporary fixtures
   */

  todos: new bindable.Collection([
    new bindable.Object({ text: "Wash Car" }),
    new bindable.Object({ text: "Walk Dog" })
  ]),

  /**
   */

  sections: {
    items: {
      type: "list",
      source: "todos",
      modelViewClass: require("./todo")
    }
  }
});
```

This is just like the header view, and maybe not so [DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself) since we're literally copying and pasting the same code, but it'll be different
in the end. Remember, we're just creating the `scaffolding` for our application. We'll fill-in the implementation later. Now, just like the header view, copy the following code into
`views/main/todos/index.pc`:

```html
<section id="main">
  <ul id="todo-list">
    {{ html: sections.items }}
  </ul>

  <input type="checkbox" id="toggle-all" />
</section>
```

Time to wire it up. Create a new section called `todos` in `views/main/index.js`, and in `views/main/index.pc`. Refresh the browser, and you should *still* see the todos section, except
now it's in a more encapsulated, manageable place.
