const graphql = require("graphql");
const pg_promise = require("pg-promise");
const connectionString = {
    host: "ec2-34-196-180-38.compute-1.amazonaws.com",
    port: 5432,
    database: "dbu0u155104t2k",
    password: "4013f7ff7030a73b5416346a2dbf4f574b1e19f77ec6d23dcd86af6bdf35c0c3",
    user: "cjyhlnswiregtb",
    ssl: true
};
const pgp = pg_promise();
const db = pgp(connectionString);
const { 
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema } 
    = graphql_1;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString }
    })
});
const RootQuery = new GraphQLObjectType({
    name: 'RootQuerytype',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
            }
        }
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery
});
//# sourceMappingURL=schema.js.map
