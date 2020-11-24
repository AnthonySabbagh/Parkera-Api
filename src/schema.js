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
    dialectOptions: { ssl: { require: true } },
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
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

//Define sequelize models
const User = require("./UserModel.js")(sequelize, DataTypes);
const CarInfo = require("./CarModel.js")(sequelize, DataTypes);
const ParkingSpot = require("./ParkingSpotModel.js")(sequelize, DataTypes);
const AuthenticationInfos = require("./AuthenticationInfos.js")(
  sequelize,
  DataTypes
);

//Defining relations and syncing models with database
const Booking = require("./BookingModel.js")(sequelize, DataTypes);
(async () => {
  await User.sync({ alter: true });
})();
AuthenticationInfos.belongsTo(User);
(async () => {
  await AuthenticationInfos.sync({ alter: true });
})();
User.hasMany(ParkingSpot);
(async () => {
  await ParkingSpot.sync({ alter: true });
})();
User.hasMany(CarInfo);
(async () => {
  await CarInfo.sync({ alter: true });
})();
User.hasMany(Booking);
ParkingSpot.hasMany(Booking);
CarInfo.hasMany(Booking);
(async () => {
  await Booking.sync({force: true })
})();
(async () => {
  await User.sync({ alter: true });
  await CarInfo.sync({ alter: true });
  await ParkingSpot.sync({ alter: true });
  await AuthenticationInfos.sync({ alter: true });
  await Booking.sync({alter: true })
})();

//Get google maps api client
const {Client} = require("@googlemaps/google-maps-services-js");
const mapsClient = new Client({});

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
    duration: {type: GraphQLInt},
  })
})

var usersResolver = require("./resolvers/users.js");
var carsByUserIdResolver = require("./resolvers/carsByUserId.js");
var parkingSpotsByUserIdResolver = require("./resolvers/parkingSpotsByUserId.js");
var carsResolver = require("./resolvers/cars.js");
var parkingSpotsResolver = require("./resolvers/parkingSpots.js");
var authenticationInfosResolver = require("./resolvers/auth.js");
var authenticationInfosByEmailResolver = require("./resolvers/authByEmail.js");
var bookingsResolver = require("./resolvers/bookings.js");

const { DatabaseError } = require("sequelize/lib/errors");

const RootQuery = new GraphQLObjectType({
  name: "RootQuerytype",
  fields: {
    users: {
      type: GraphQLList(UserType),
      resolve(parent, args) {
        return usersResolver(parent, args, User)
      },
    },
    cars: {
      type: GraphQLList(CarType),
      resolve(parent, args) {
        return carsResolver(parent, args, CarInfo);
      },
    },
    carsByUserId: {
      type: GraphQLList(CarType),
      args: {
        userAccountId: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return carsByUserIdResolver(parent, args, CarInfo);
        }
    },
    parkingSpotsByUserId: {
      type: GraphQLList(ParkingSpotType),
      args: {
        userAccountId: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return parkingSpotsByUserIdResolver(parent, args, ParkingSpot);
      },
    },
    parkingSpots: {
      type: GraphQLList(ParkingSpotType),
      resolve(parent, args) {
        return parkingSpotsResolver(parent, args, ParkingSpot);
      },
    },
    authenticationInfos: {
      type: GraphQLList(AuthenticationInfoType),
      resolve(parent, args) {
        return authenticationInfosResolver(parent, args, AuthenticationInfos);
      },
    },
    getAuthenticationbyEmail: {
      type: GraphQLList(AuthenticationInfoType),
      args: {
        email: { type: GraphQLString },
      },
      resolve(parent, args) {
        return authenticationInfosByEmailResolver(parent, args, AuthenticationInfos);
      },
    },
    bookings: {
      type: GraphQLList(BookingType),
      resolve(parent, args) {
        return bookingsResolver(parent, args, Booking);
      },
    },
    searchNear: {
      type: GraphQLList(ParkingSpotType),
      args: {
        latitude: {type: graphql.GraphQLFloat},
        longitude: {type: graphql.GraphQLFloat}
      },
      async resolve(parent, args){
        spots = await ParkingSpot.findAll({ raw: true });
        console.log("spots", spots);
        spotArray = spots.keys();
        console.log(spots[0]);
        console.log(spots.length)
        var spotCoordinates = [];
        for (i = 0; i < spots.length; i++){
          spotCoordinates[i]=[spots[i].latitude, spots[i].longitude];
        }
        var closeIDs;
        console.log(spotCoordinates);
        await mapsClient.distancematrix({
          params: {
            origins: spotCoordinates,
            destinations: [[args.latitude, args.longitude]],
            key: "AIzaSyC5VziP787dJWjz-FGiH6pica_oWyF0Yk8"
          },
          timeout: 1000 // milliseconds
        }
        //, axiosInstance)
        )
        .then(r => {
          var spotDistances = []; //format [[id,distance(in meters)]]
          for (i = 0; i < r.data.rows.length; i++){
            console.log(r.data.rows[i].elements[0].distance.value)
            spotDistances[i]=[spots[i].id, r.data.rows[i].elements[0].distance.value]
          }
          console.log(spotDistances);
          //finding closest spots within 2km
          spotDistances=spotDistances.filter(function(s) {
            return s[1] <= 2000
          });
          spotDistances.sort(function(s1,s2) {
            return s1[1]-s2[1]
          });
          console.log(spotDistances);
          //plotDistances.splice(0, 5); can be used to return a max of 5 spots
          closeIDs = spotDistances.map(function(s){
            return s[0];
          });
          console.log(closeIDs);
          })
        .catch(e => {
          console.log(e);
        });
        console.log(closeIDs);
        console.log(spots);
        r=spots.filter( element => closeIDs.includes(element.id))
        console.log(r);
        return r;
      }
    }
  }
});

var addUserResolver = require("./resolvers/addUser.js");
var addCarResolver = require("./resolvers/addCar.js");
var updateCarResolver = require("./resolvers/updateCar.js");
var updateParkingSpotResolver = require("./resolvers/updateParkingSpot.js");
var addParkingSpotResolver = require("./resolvers/addParkingSpot.js");
var addAuthenticationsResolver = require("./resolvers/addAuthentications.js");
var addBookingResolver = require("./resolvers/addBooking.js");
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
        return addUserResolver(parent, args, User, AuthenticationInfos);
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
        return addCarResolver(parent, args, CarInfo);
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
        return updateCarResolver(parent, args, CarInfo);
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
        return updateParkingSpotResolver(parent, args, ParkingSpot);
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
       return addParkingSpotResolver(parent, args, ParkingSpot);
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
        return addAuthenticationsResolver(parent, args, AuthenticationInfos);
      },
    },
    addBooking: {
      type: BookingType,
      args: {
        duration: { type: GraphQLInt },
        parkSpotId: { type: GraphQLInt },
        carInfoId: { type: GraphQLInt },
        userAccountId: { type: GraphQLInt },
      },
      resolve(parent, args) {
       return addBookingResolver(parent, args, Booking);
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
