var dotenv = require("dotenv");
var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");
dotenv.config();
const PORT = process.env.SERVER_PORT || process.env.PORT || 80;
const schema = require("./schema.js");
// var schema = buildSchema(`
//     type Query {
//         hello: String
//     }
// `);

// var sequelize = new Sequelize("postgres://user:pass@example.com:5432/dbname");
// var schema = buildSchema(`
//     type Query {
//         hello: String
//     }
// `);

var root = {
  hello: () => {
    return "Hello World!";
  }
};

var app = express();
app.get("/", (req, res) => res.send("Parkera API. Hit api at /api"));
app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(PORT);
console.log("Running GraphQL API on port " + PORT);
