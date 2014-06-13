Decorators allow you to customize the behavior of view controllers. They are what makeup view controllers.

### Sections

Sections allow you to specify nested views. They make it easy to break your application views into smaller,
more manageable chunks.

```javascript
//
var MainView = views.Base.extend({
  sections: {
    header: HeaderView,
    body: BodyView,
    footer: FooterView
  }
})
```

### Bindings

Bindings allow you to compute properties on your view controller

### Templates

TODO

### Custom

TODO
