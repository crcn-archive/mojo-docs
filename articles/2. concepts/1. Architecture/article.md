The Mojo.js architecture was inspired by other frameworks spanning multiple platforms. Primary sources of inspiration include: [express.js](http://expressjs.com/), [Angular.js](http://angularjs.org/), [Derby.js](http://derbyjs.com/), [Knockout.js](http://knockoutjs.com/), [Meteor.js](http://www.meteor.com/), [Ember.js](http://emberjs.com/), [jQuery](http://jquery.com/), and [Backbone.js](http://backbonejs.org/). 

### Helpful Resources

- [Ember.js: The Architecture Advantage](https://speakerdeck.com/lukemelia/ember-dot-js-the-architecture-advantage) - explains relationship between models, view controllers, templates, and the router. Very similar to how Mojo works.

### Terminology

Below are a list of terms used within Mojo.js, including what they are, and how they should be used within your application.

#### [Application](https://github.com/mojo-js/mojo-application)

The main entry point to your entire appliation. This acts like a sandbox. Everything is registered to your application including `models`, `views`, `router`, etc. It is the **only** thing that lives within the global namespace.

#### [Models & Collections](https://github.com/mojo-js/bindable.js)

Models & Collections represent data which usually gets displayed to the user. This data usually comes from some API, or service. Models are the **only** thing which should handle data, and all data should thus be wrapped as a model, or collection. Models should be designed around how your application is going to use them. Try not to design models around the API. 

#### [View Controllers](https://github.com/mojo-js/mojo-views)

View Controllers act as a proxy between the template (what the user sees), and everything outside of the view controller. They're generally controlled by `models`, and have access to the `application`, `models`, `commands`, and the `router`. View controllers should **never** make any API calls.

#### [View Templates](https://github.com/mojo-js/paperclip.js)

What the user sees. View Templates are controlled by `view controllers`. View templates include [paperclip](https://github.com/mojo-js/paperclip.js), [htmlbars](https://github.com/tildeio/htmlbars), [handlebars](http://handlebarsjs.com/), [mustache](http://mustache.github.io/), etc.

#### [Commands](https://github.com/mojo-js/mediocre.js)

Registered commands which can be executed anywhere in the application.

#### [Router](https://github.com/mojo-js/kubrik.js)

Maintains the state of your application. The application should not be design around the router, and vice versa. The router is an interchangeable component, and can be added last in the development lifecycle. 