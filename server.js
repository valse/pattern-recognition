var express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  port = process.env.PORT || 8000;

// parse application/json
app.use(bodyParser.json());

// set routes
var routes = require("./routes");
routes(app);

// listening...
app.listen(port);

console.log("REST API server started!\nhttp://localhost:" + port);
