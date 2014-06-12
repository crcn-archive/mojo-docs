Creates a list of views which is represented by a bindable collection. Note that each model is set as
`model` property for each list item view created. For example:

```javascript
var views = require("mojo-views"),
bindable  = require("bindable");

var PersonView = views.Base.extend({
  // properties...
});

var PeopleView = views.List.extend({

  // create a base view
  modelViewClass: PersonView
});

var people = new bindable.Collection([
    new bindable.Object({ firstName: "Craig" }),
    new bindable.Object({ firstName: "John"  })
]);

// create the new PeopleView with the people as the source
var peopleView = new PeopleView({
  source: people
});

// render the list view to create each PersonView. Note that
// "Craig" model will be set as '.model' on the first person view.
people.render();
```

#### listView.source

The source bindable collection which is used to create each list view item.

#### listView.filter

applies a filter on the list

```javascript
var PeopleListView = views.List.extend({
  filter: function (modelA) {
    return modelA.get("age") > -1;
  }
});
```

#### listView.sort

sorts the list

```javascript
var PeopleListView = views.List.extend({
  sort: function (modelA, modelB) {
    return modelA.get("firstName") > modelB.get("firstName") ? -1 : 1;
  }
});
```

#### listView.modelViewClass

Class to use for each model in source
