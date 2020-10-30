const graphql = require("graphql");
const { Sequelize } = require("sequelize");
const DataTypes = require("sequelize/lib/data-types");

const dbconfig = require("./db");

const determineDbEnv = () => {
  const env = process.env.NODE_ENV || 'development';
  if (env === "test") {
    return dbconfig.test;
  } else if (env === "production") {
    return dbconfig.production
  } 
  return dbconfig.development;
};

const db = determineDbEnv();

const sequelize = new Sequelize({...db,
  logging: console.log,
  ssl: true,
  dialectOptions: { ssl: { require: true } }
});

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
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

//Define sequelize models
const User = require("../models/UserModel.js")(sequelize, DataTypes);
const CarInfo = require("./CarModel.js")(sequelize, DataTypes);
const ParkingSpot = require("../models/ParkingSpotModel.js")(sequelize, DataTypes);
const AuthenticationInfos = require("./AuthenticationInfos.js")(
  sequelize,
  DataTypes
);
const Booking = require("./BookingModel.js")(sequelize, DataTypes);
ParkingSpot.belongsTo(User);
CarInfo.belongsTo(User);
AuthenticationInfos.belongsTo(User);
// Booking.belongsTo(User);
// Booking.belongsTo(CarInfo);
// Booking.belongsTo(ParkingSpot);

//Synching database with how models are defined
(async () => {
  await User.sync({ alter: true });
  await CarInfo.sync({ alter: true });
  await ParkingSpot.sync({ alter: true });
  await AuthenticationInfos.sync({ alter: true });
  await Booking.sync({alter: true })
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
    phone: { type: GraphQLString },
  }),
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
    userAccountId: { type: GraphQLInt },
  }),
});

const ParkingSpotType = new GraphQLObjectType({
  name: "ParkingSpot",
  fields: () => ({
    id: { type: GraphQLInt },
    updatedAt: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    address: { type: GraphQLString },
    longitude: { type: GraphQLFloat },
    latitude: { type: GraphQLFloat },
    userAccountId: { type: GraphQLInt },
    price: { type: GraphQLFloat },
  }),
});

const AuthenticationInfoType = new GraphQLObjectType({
  name: "AuthInfo",
  fields: () => ({
    password: { type: GraphQLString },
    is_login: { type: GraphQLBoolean },
    email: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    userAccountId: { type: GraphQLInt },
  }),
});

const BookingType = new GraphQLObjectType({
  name: "Booking",
  fields: () => ({
    id: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    userAccountId: { type: GraphQLInt },
    carInfoId: { type: GraphQLInt},
    parkSpotId: { type: GraphQLInt},
    totalCost: {type: GraphQLFloat},
  })
})

var userResolver = require("./resolvers/userQuery.js");
const { DatabaseError } = require("sequelize/lib/errors");

const RootQuery = new GraphQLObjectType({
  name: "RootQuerytype",
  fields: {
    users: {
      type: GraphQLList(UserType),
      async resolve(parent, args) {
        return userResolver(parent, args, User)
      },
    },
    cars: {
      type: GraphQLList(CarType),
      async resolve(parent, args) {
        console.log("cars query");
        cars = await CarInfo.findAll({ raw: true });
        console.log("cars", cars);
        return cars;
      },
    },
    carsByUserId: {
      type: GraphQLList(CarType),
      args: {
        userAccountId: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return CarInfo.findAll({
          raw: true,
          where: {
            userAccountId: args.userAccountId,
          },
        });
      },
    },
    parkingSpotsByUserId: {
      type: GraphQLList(ParkingSpotType),
      args: {
        userAccountId: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return ParkingSpot.findAll({
          raw: true,
          where: {
            userAccountId: args.userAccountId,
          },
        });
      },
    },
    parkingSpots: {
      type: GraphQLList(ParkingSpotType),
      async resolve(parent, args) {
        console.log("parking spot query");
        spots = await ParkingSpot.findAll({ raw: true });
        console.log("spots", spots);
        return spots;
      },
    },
    authenticationInfos: {
      type: GraphQLList(AuthenticationInfoType),
      async resolve(parent, args) {
        // consossssle.log("parking spot query");
        autheticationInfos = await AuthenticationInfos.findAll({ raw: true });
        // console.log("spots", spots);
        return autheticationInfos;
      },
    },
    getAuthenticationbyEmail: {
      type: GraphQLList(AuthenticationInfoType),
      args: {
        email: { type: GraphQLString },
      },
      resolve(parent, args) {
        return AuthenticationInfos.findAll({
          where: {
            email: args.email,
          },
        });
      },
    },
    bookings: {
      type: GraphQLList(BookingType),
      async resolve(parent, args) {
        bookings = await Booking.findAll({ raw: true });
        return bookings;
      },
    },
  },
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
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        return User.create({
          firstname: args.firstname,
          lastname: args.lastname,
          user_role: args.user_role,
          email: args.email,
          phone: args.phone,
        })
          .then((resp) => {
            const user = resp.dataValues;

            AuthenticationInfos.create({
              password: args.password,
              is_login: true,
              email: user.email,
              userAccountId: user.id,
            })
              .then((resp) => {
                return resp;
              })
              .catch((err) => {
                console.log(err);
              });
            return resp;
          })
          .catch((err) => {
            throw new Error(err.errors[0].message);
          });
      },
    },
    addCar: {
      type: CarType,
      args: {
        license: { type: GraphQLString },
        model: { type: GraphQLString },
        color: { type: GraphQLString },
        userAccountId: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return CarInfo.create({
          license: args.license,
          model: args.model,
          color: args.color,
          userAccountId: args.userAccountId,
        });
      },
    },
    updateCar: {
      type: CarType,
      args: {
        id: { type: GraphQLInt },
        license: { type: GraphQLString },
        model: { type: GraphQLString },
        color: { type: GraphQLString },
      },
      resolve(parent, args) {
        return CarInfo.findByPk(args.id).then((car) => {
          return car
            .update({
              license: args.license,
              model: args.model,
              color: args.color,
            })
            .then((car) => {
              console.log(car.dataValues);
              return car.dataValues;
            });
        });
      },
    },
    updateParkingSpot: {
      type: ParkingSpotType,
      args: {
        id: { type: GraphQLInt },
        address: { type: GraphQLString },
        longitude: { type: graphql.GraphQLFloat },
        latitude: { type: graphql.GraphQLFloat },
        price: { type: graphql.GraphQLFloat },
      },
      resolve(parent, args) {
        return ParkingSpot.findByPk(args.id).then((spot) => {
          return spot
            .update({
              address: args.address,
              longitude: args.longitude,
              latitude: args.latitude,
              price: args.price,
            })
            .then((spot) => {
              console.log(spot.dataValues);
              return spot.dataValues;
            });
        });
      },
    },
    addParkingSpot: {
      type: ParkingSpotType,
      args: {
        address: { type: GraphQLString },
        longitude: { type: graphql.GraphQLFloat },
        latitude: { type: graphql.GraphQLFloat },
        userAccountId: { type: GraphQLInt },
        price: { type: GraphQLFloat },
      },
      resolve(parent, args) {
        return ParkingSpot.create({
          address: args.address,
          longitude: args.longitude,
          latitude: args.latitude,
          userAccountId: args.userAccountId,
          price: args.price,
        });
      },
    },
    addAuthentications: {
      type: AuthenticationInfoType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        userAccountId: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return AuthenticationInfos.create({
          email: args.email,
          password: args.password,
          userAccountId: args.userAccountId,
        });
      },
    },
    addBooking: {
      type: BookingType,
      args: {
        price: { type: GraphQLFloat },
        parkSpotId: { type: GraphQLInt },
        carInfoId: { type: GraphQLInt },
        userAccountId: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return Booking.create({
          price: args.price,
          parkSpotId: args.parkSpotId,
          carInfoId: args.parkSpotId,
          userAccountId: args.userAccountId,
        });
      },
    },
  },
});
module.exports = {
  schema: new GraphQLSchema({
    query: RootQuery,
    mutation,
  }),
};
//# sourceMappingURL=schema.js.map
