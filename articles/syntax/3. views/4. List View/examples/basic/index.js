var views = require("mojo-views"),
bindable  = require("bindable");

/**
 * people models
 */

var people = new bindable.Collection([
  new bindable.Object({ name: "Alex", age: 64 }),
  new bindable.Object({ name: "Jon", age: 25 }),
  new bindable.Object({ name: "Jeff", age: 30 }),
  new bindable.Object({ name: "Zach", age: 53 })
]);

/**
 * Created for each person in the "people" collection
 */

var PersonView = views.Base.extend({
  paper: require("./person.pc")
});

/**
 * main view displayed to the user
 */

var MainView = views.Base.extend({
  paper: require("./index.pc"),
  sections: {

    // setup the list of people.
    people: {
      type: "list",
      source: people,
      modelViewClass: PersonView,
      sort: function (av, bv) {
        return av.get("model.name") > bv.get("model.name") ? 1 : -1;
      },
      filter: function (a, b) {
        return a.get("age") > 30;
      } 
    }
  }
});

module.exports = MainView;