View states allow you to dynamically switch between what the user sees.

```javascript
//
var HomeView = views.Base.extend({
  // render props
});

var ContactView = views.Base.extend({
  // render props
});


var PagesView = views.StatesView.extend({
  views: [
    { class: HomeView    , name: "home"     },
    { class: ContactView , name: "contact"  }
  ]
});


var view = new PagesView();
```

TODO
