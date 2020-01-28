var dotenv = require('dotenv');
var express = require('express');
var graphqlHTTP = require('express-graphql');
var {buildSchema} = require('graphql');
dotenv.config();
const PORT = process.env.SERVER_PORT || process.env.PORT || 80;

var schema = buildSchema(`
    type Query {
        hello: String
    }
`);

var root = {
    hello: () => {
        return 'Hello World!';
    },
};

var app = express();
app.get('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(PORT);
console.log('Running GraphQL API on port ' + PORT);
