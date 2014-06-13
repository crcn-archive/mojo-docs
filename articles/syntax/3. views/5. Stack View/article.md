The stack view contains a number of children, one of which is displayed at a time given the
state of the stack view.

```javascript
//
var HomeView = views.Base.extend({
  // render props
});

var ContactView = views.Base.extend({
  // render props
});


var PagesView = views.Stack.extend({
  sections: {
    home: HomeView,
    contact: ContactView
  }
});


var view = new PagesView();
document.body.append(view.render());
view.set("state", "home");    // home view is visible
view.set("state", "contact"); // contact view is visible
```

#### stackView.state

the current state of the stack view

### Nested States

Nesting states is pretty straight forward. All you need to do is set `states` to the
`root` view, and those states will be propagated down to every sub-stack view.


```javascript
//
var AuthView = view.Stack.extend({
  sections: {
    login: LoginView,
    signup: SignupView
  }
});

var MainView = view.Stack.extend({
  sections: {
    auth: AuthView,
    home: HomeView
  }
});

var main = new MainView({ name: "main" });

main.set("states", {
  main: "auth",
  auth: "login"
});

console.log(main.get("state")); // auth
console.log(main.get("sections.auth.state")); // login

```
