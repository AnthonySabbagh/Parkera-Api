const graphql = require("graphql");
const { Sequelize } = require("sequelize");
const DataTypes = require("sequelize/lib/data-types");
const sequelize = new Sequelize(
  "postgres://cjyhlnswiregtb:4013f7ff7030a73b5416346a2dbf4f574b1e19f77ec6d23dcd86af6bdf35c0c3@ec2-34-196-180-38.compute-1.amazonaws.com:5432/dbu0u155104t2k",
  {
    dialect: "postgres",
    protocol: "postgres",
    port: 5432,
    host: "ec2-34-196-180-38.compute-1.amazonaws.com",
    logging: console.log,
    ssl: true,
    dialectOptions: { ssl: { require: true } }
  }
);
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema
} = require("graphql");

//Define sequelize models
const User = require("./UserModel.js")(sequelize, DataTypes);
const CarInfo = require("./CarModel.js")(sequelize, DataTypes);
const ParkingSpot = require("./ParkingSpotModel.js")(sequelize, DataTypes);
const AuthenticationInfos = require("./AuthenticationInfos.js")(
  sequelize,
  DataTypes
);
ParkingSpot.belongsTo(User);
CarInfo.belongsTo(User);
//Synching database with how models are defined
(async () => {
  await User.sync({ alter: true });
  await CarInfo.sync({ alter: true });
  await ParkingSpot.sync({ alter: true });
  await AuthenticationInfos.sync({ alter: true });
})();

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    updatedAt: { type: GraphQLString },
    createdAt: { type: GraphQLString },
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
    id: { type: GraphQLInt },
    updatedAt: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    license: { type: GraphQLString },
    model: { type: GraphQLString },
    color: { type: GraphQLString },
    userAccountId: { type: GraphQLInt }
  })
});

const ParkingSpotType = new GraphQLObjectType({
  name: "ParkingSpot",
  fields: () => ({
    id: { type: GraphQLInt },
    updatedAt: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    address: { type: GraphQLString },
    userAccountId: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuerytype",
  fields: {
    users: {
      type: GraphQLList(UserType),
      async resolve(parent, args) {
        console.log("user query");
        users = await User.findAll({ raw: true });
        console.log("users", users);
        return users;
      }
    },
    cars: {
      type: GraphQLList(CarType),
      async resolve(parent, args) {
        console.log("cars query");
        cars = await CarInfo.findAll({ raw: true });
        console.log("cars", cars);
        return cars;
      }
    },
    parkingSpots: {
      type: GraphQLList(ParkingSpotType),
      async resolve(parent, args) {
        console.log("parking spot query");
        spots = await ParkingSpot.findAll({ raw: true });
        console.log("spots", spots);
        return spots;
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
        email: { type: GraphQLString, primary: true },
        phone: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, args) {
        return User.create({
          firstname: args.firstname,
          lastname: args.lastname,
          user_role: args.user_role,
          email: args.email,
          phone: args.phone
        })
          .then(resp => {
            const user = resp.dataValues;
            AuthenticationInfos.create({
              password: args.password,
              is_login: true,
              email: user.email,
              userAccountId: user.id
            })
              .then(resp => {})
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => console.log(err));
      }
    },
    addCar: {
      type: CarType,
      args: {
        license: { type: GraphQLString },
        model: { type: GraphQLString },
        color: { type: GraphQLString },
        userAccountId: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return CarInfo.create({
          license: args.license,
          model: args.model,
          color: args.color,
          userAccountId: args.userAccountId
        });
      }
    },
    addParkingSpot: {
      type: ParkingSpotType,
      args: {
        address: { type: GraphQLString },
        userAccountId: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return ParkingSpot.create({
          address: args.address,
          userAccountId: args.userAccountId
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
