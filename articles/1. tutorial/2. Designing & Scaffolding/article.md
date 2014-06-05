The first thing before we start coding is take a top-level glance at what the application should look like. If we inspect the todos app, we can see that it's composed of many parts:

<p align="center">
  <a href="http://mojojs.com">
    <img src="https://cloud.githubusercontent.com/assets/757408/3194703/b8d1eee8-ed02-11e3-808e-4cd4afbbcc3b.png">
  </a>
</p>


We're not going to worry too much about the implementation at this point - we're just going to start scaffolding exactly what we see, and create a 1-1 map between that, and what the file structure of the application. If in the future we need to change something, we can make changes then, which is easy thanks to the file structure we're about to setup. Generally, it's easier, and much faster if we only focus on what we need right now instead of over-analyzing what we *might* need. 

Okay, so here's what we see:

1. Todo list outer container with "Todo" header.
2. Input field for adding a new todo item
3. List of todo items with various states
4. Footer with various controls

Now let's jump straight into the starter kit and add a few files - don't worry about implementation at this point:

```
app/
  views/
    main/
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





