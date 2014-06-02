Writing tests with Mojo is incredibly simple due to the modular, and encapsulated nature of the framework. Tests
are generally don't have knowledge of the platform they're running on, so you can easily run everything within Node.js, the browser, or any
other JavaScript supported platform.

Unit Tests are preferable over e2e tests for a number of reasons:

1. They promote TDD, or BDD-style development practices.
2. They compliment the framework's modularity. It's easy to write tests for small units of code.

E2E tests are also useful since they ensure every unit of code works together as a whole. At ClassDojo, we generally
write e2e tests for core features of the website such as basic login, signup, forgot & reset password. Everything else that
is front-end specific is usually written as a unit test.

File Structure:

```
test/
  e2e/
    stories/
  unit/
    routes/
    views/
    models/
```
