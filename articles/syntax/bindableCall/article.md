[bindableCall](https://github.com/classdojo/bindable-call) a utility to help make data-binding asynchronous calls easier. Here's an example:

```javascript
var bindableCall = require("bindable-call");

function login (credentials, complete) {

  // simulate async request
  setTimeout(function () {
    if (credentials.user != "username" || credentials.pass != "password") return complete(new Error("unauthorized"));
    complete(null, { message: "logged in!" });
  }, 100);
}


// the following will succeed
var loginRequest = bindableCall(function (complete) {
  login({ user: "username", pass: "password"}, complete);
});

loginRequest.bind("success", function (success) {
  console.log(success); // true
});

loginRequest.bind("result", function (result) {
  console.log(result); // { message: "logged in" }
});



```


Bindable calls are especially useful when executing `commands` from a `view controller`: 


`loginView.js`:

```javascript
var views    = require("mojo-views"),
bindableCall = require("bindable-call");

views.Base.extend({
  paper: require("./loginView.pc"),
  login: function () {
    var self = this;

    // setup the async call
    this.set("loginRequest", bindableCall(function (complete) {

      // execute the login request with the credentials inputed by the user

      self.application.mediator.execute("login", {
        user: self.get("username"),
        pass: self.get("passwrod")
      }, complete);
    }))
  }
});
```

`loginView.pc`:

```html
<form data-bind="{{ onSubmit: login() }}">
  <input type="text" data-bind="{{ user: <~>username }}" placeholder="Username"></input>
  <input type="password" data-bind="{{ user: <~>password }}" placeholder="Password"></input>
  <input type="submit" value="Login"></input>
</form>
```