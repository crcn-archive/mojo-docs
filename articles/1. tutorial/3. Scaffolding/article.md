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

So now we've written the HTML & CSS, we can now start breaking our application down into smaller components.

First copy the following code into `views/main/header/index.js`:

```javascript
var views = require("mojo-views");
module.exports = views.Base.extend({
  paper: require("./index.pc")
});
```

Notice `require("./index.pc")` - this is derived from [commonjs](http://en.wikipedia.org/wiki/CommonJS). Basically, we're *requiring* a file located in the same directory of the view controller. This happens to be
the template which gets displayed to the user. The term `paper` is terminology used for the template engine `paperclip`. Whereas `paper` is the template, and `clips` are the
data-bindings. `paper: require("./index.pc")` is basically saying: "load `index.pc` from the same directory as `index.js`, and use that as a paperclip template".

`module.exports` is also derived from `commonjs`, and exposes your view controller.

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


We're not actually done yet. We still need to use our new header sub-view. So how do we do that? Just add a new section.

Copy the following chunk of code into `views/main/index.js`:

```javascript
var views = require("mojo-views");

module.exports = views.Base.extend({
  paper: require("./index.pc"),
  sections: {
    header: require("./header")
  }
});
```

`Sections` are nice helpers which allow you to specify sub-views in your view controller. They're great for breaking components into smaller, more manageable chunks of code.


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
control what the user sees, so it makes sense to let the view controller specify what sub-views should be displayed to the user.

After adding the `header section` in the template, go ahead and refresh the browser. Your todo application should look the same. The only difference is that `header` is specified
in another sub-component.

Now let's move onto the `todos` sub-component. Copy the following code into `views/main/todos/index.js`:

```javascript
var views = require("mojo-views");
module.exports = views.Base.extend({
  paper: require("./index.pc")
});
```

This is just like the header view, and maybe not so [DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself) since we're literally copying and pasting the same code, but it'll be different
in the end. Remember, we're just creating the `scaffolding` for our application. We'll fill-in the implementation later. Now, just like the header view, copy the following code into
`views/main/todos/index.pc`:

```html
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
```

Time to wire it up. Create a new section called `todos` in `views/main/index.js`, and in `views/main/index.pc`. Refresh the browser, and you should *still* see the todos section, except
now it's a sub-component located in an encapsulated, manageable place.

Now it's time to add a list of todo items. Add a new file called `views/main/todos/todo/index.js`, and copy the same view controller code:

```javascript
var views = require("mojo-views");
module.exports = views.Base.extend({
  paper: require("./index.pc")
});
```

in `views/main/todos/todo/index.pc`, copy the following code:

```html
<li>
  <input type="checkbox" class="toggle" />
  <label>Wash Dog</label><button class="destroy"></button>
</li>
```

Back to `views/main/todos/index.js`, copy the following code:


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
    new bindable.Object({ }),
    new bindable.Object({ })
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

Essentially, we're setting up the view controller to create a new `todo` component for *each* todo model. Notice the `bindable.Collection([..])` chunk, this is
just fake information we'll use to make sure everything looks great in the browser. Later, we'll replace it with real model data. The `sections` property also looks
a bit different. `Type` just points to a registered view component. Registered view components are re-usable pieces of code that are accessible anywhere in the application.
Mojo.js comes with a few registered components by default: `list`, and `states`. Since we're displaying a list of todos, we'll use the `list` component. The other
properties you see: `source`, and `modelViewClass` are just properties which are set to the sub-component. The `modelViewClass` property creates a new view class for each model,
in the source. `Source` can be a `bindable collection`, or a `string`. In the view controller above, we're specifying `source: "todos"`, which is pointing to the fake model data. Since the list is actually a sub-component, it's is actually *inheriting* the `todos` property from the parent component. This is very similar to how variable scope works in JavaScript. More of that later.


Now we need to update our todos template. Copy the following code into `views/main/todos/todo/index.pc`:

```html
<section id="main">
  <ul id="todo-list">
    {{ html: sections.items }}
  </ul>
  <input type="checkbox" id="toggle-all" />
</section>
```

Refresh your browser, and should see your new todos component.

The last bit is setting up the footer view. I'll assume you know how to set it up at this point. Just follow the same process as the header view, and you should have a todo
application that's ready for the next part of this tutorial.

In the end, you're folder structure should look like this:


```
views/
  main/
    index.js
    index.pc
    header/
      index.js
      index.pc
    todos/
      index.js
      index.pc
      todo/
        index.js
        index.pc
    footer/
      index.js
      index.pc
```

This file structure is essentially what we the user sees, and anyone else looking at this folder structure will have an idea of what the application does. It's a nice 1-1 map.
The decision to use the folder as the view controller name is to provide better organization, and encapsulation between other parts of the application. It's also an easy pattern to follow. Anyone building
a new application can intuitively figure out how to structure an application *just by looking at it*.
