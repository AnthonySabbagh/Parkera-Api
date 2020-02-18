const graphql = require("graphql");
const { Sequelize } = require("sequelize");
const DataTypes = require('sequelize/lib/data-types');
const sequelize = new Sequelize("postgres://cjyhlnswiregtb:4013f7ff7030a73b5416346a2dbf4f574b1e19f77ec6d23dcd86af6bdf35c0c3@ec2-34-196-180-38.compute-1.amazonaws.com:5432/dbu0u155104t2k",{
    dialect:  'postgres',
    protocol: 'postgres',
    port:     5432,
    host:     'ec2-34-196-180-38.compute-1.amazonaws.com',
    logging:  console.log,
    ssl:true,
    dialectOptions:{ "ssl": {"require":true }}
});
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema
} = require("graphql");
const User = require("./UserModel.js")(sequelize, DataTypes);
const CarInfo = require("./CarModel.js")(sequelize, DataTypes);
CarInfo.belongsTo(User);
//Synching Database with how models are defined
(async () => {
    await User.sync({ alter: true });
    await CarInfo.sync({ alter: true });
})();

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        user_role: { type: GraphQLString },
        email: { type: GraphQLString, primary: true },
        phone: { type: GraphQLString }
    })
});

const CarType = new GraphQLObjectType({
    name: "CarInfo",
    fields: () => ({
        license: { type: GraphQLString },
        model: { type: GraphQLString },
        color: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQuerytype",
    fields: {
        users: {
            type: GraphQLList(UserType),
            async resolve(parent, args) {
                console.log("user query");
                users = await User.findAll({raw:true});
                console.log("users", users);
                return users;
            }
        },
        cars: {
            type: GraphQLList(CarType),
            async resolve(parent, args) {
                console.log("cars query");
                cars = await CarInfo.findAll({raw:true});
                console.log("cars", cars);
                return cars;
            }
        }
    }
});
const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstname: { type: GraphQLString },
                lastname: { type: GraphQLString },
                user_role: { type: GraphQLString },
                email: { type: GraphQLString},
                phone: { type: GraphQLString }
            },
            resolve(parent, args) {
                return User.create({
                    firstname: args.firstname,
                    lastname: args.lastname,
                    user_role: args.user_role,
                    email: args.email,
                    phone: args.phone
                });
            }
        },
        addCar: {
            type: CarType,
            args: {
                license: { type: GraphQLString },
                model: { type: GraphQLString },
                color: { type: GraphQLString },
            },
            resolve(parent, args) {
                return CarInfo.create({
                    license: args.license,
                    model: args.model,
                    color: args.color,
                });
            }
        }
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});
//# sourceMappingURL=schema.js.map
