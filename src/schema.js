const graphql = require("graphql");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  "postgres://cjyhlnswiregtb:4013f7ff7030a73b5416346a2dbf4f574b1e19f77ec6d23dcd86af6bdf35c0c3@ec2-34-196-180-38.compute-1.amazonaws.com:5432/dbu0u155104t2k"
);
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = graphql_1;
const User = require("./UserModel.js");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    uid: { type: GraphQLString },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    user_role: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuerytype",
  fields: {
    users: {
      type: UserType,
      resolve(parent, args) {
        User.findAll().then(users => {
          console.log("All users:", JSON.stringify(users, null, 4));
          return users;
        });
      }
    }
  }
});
module.exports = new GraphQLSchema({
  query: RootQuery
});
//# sourceMappingURL=schema.js.map
