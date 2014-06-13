The stack view is a container which has many children, of which only one is displayed at a time. Stack views
are very when building single page applications that have navigation. Here's a basic example of using the stack view:

```javascript
//
var HomeView = views.Base.extend({

  // point to the home paperclip template
  paper: require("./home.pc")
});

var ContactView = views.Base.extend({

  // point to the contact paperclip template
  paper: require("./contact.pc")
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

#### stackView.currentSection

the current visible section

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
  name: "main",
  sections: {
    auth: AuthView,
    home: HomeView
  }
});

var main = new MainView();

main.set("states", {
  main: "auth",
  auth: "login"
});

console.log(main.get("state")); // auth
console.log(main.get("sections.auth.state")); // login
```
