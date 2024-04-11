### Conceptual Exercise

Answer the following questions below:

-   What are some ways of managing asynchronous code in JavaScript?

Promises and async/await.

-   What is a Promise?

Its a "promise" that the method will supply a value once the async code has run. It allows apps to run async code side-by-side and prevents the app from stalling everytime a async function is run.

-   What are the differences between an async function and a regular function?

Async always returns a promise. This will eventually receive a respones or throw an error.

-   What is the difference between Node.js and Express.js?

Node.js allows you to run javascript on server side. Express.js is a framework for Node.js for building web apps and APIs. Similar to how Flask is a web application framework for Python.

-   What is the error-first callback pattern?

In Node.js where callbacks provided to async functions have an error object as their first argument. If an error occurs the object will be populated, if not it will be null.

-   What is middleware?

Function that has access to the request object, response object, and the next function.

-   What does the `next` function do?

It calls the next middleware function in a stack. Stopping the function from stalling out.

-   What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
    const elie = await $.getJSON('https://api.github.com/users/elie');
    const joel = await $.getJSON('https://api.github.com/users/joelburton');
    const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

    return [elie, matt, joel];
}
```

-Sequential requests increases run time.
-Returns the array out of order from the input.
-No error handling
