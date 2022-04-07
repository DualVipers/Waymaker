# Wayfinder: An Express Middleware That Routes Based On The Request

Wayfinder is currently centered around routing based on domain name, but that is likely to change as the package expands.
This is due to the fact that Wayfinder has no explicit reason for only resolving based on domain.

## WARNING

NodeJS must be v12 or higher, as this library does use private fields and arrow functions.

## Example

Eventually, I'll write full documentation for Wayfinder, but for now this will do.

Create a project and add express and wayfinder.

Create app.js and paste the following code block.

```lang = js
const express = require("express");
const app = express();
const port = 80;

const Wayfinder = require("wayfinder");

const wayfinder = new Wayfinder({
    matcher: Wayfinder.matchers.SubdomainMatcher,
    match: { baseDomain: "localhost" },
});

const hiRouter = express.Router();

hiRouter.get("/", (req, res) => {
    res.send("Hi!");
});

const byeRouter = express.Router();

byeRouter.get("/", (req, res) => {
    res.send("Bye!");
});

wayfinder.register("hi", hiRouter);

wayfinder.register("bye", byeRouter);

app.use(wayfinder.middleware);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
```

Now run the app.js.

When you visit `hi.localhost` in your browser you should see `hi`.

When you visit `bye.localhost` in your browser you should see `hi`.
