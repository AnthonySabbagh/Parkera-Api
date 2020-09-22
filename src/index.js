var dotenv = require("dotenv");
var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");
dotenv.config();
const PORT = process.env.SERVER_PORT || process.env.PORT || 8080;
const { schema } = require("./schema.js");
const cors = require("cors");

var app = express();

app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.get("/", (req, res) => res.send("Parkera API. Hit api at /api"));
app.listen(PORT);
console.log("Running GraphQL API on port " + PORT);

module.exports = app;
