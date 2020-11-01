module.exports = function(parent, args, ParkingSpot){
    return ParkingSpot.create({
        address: args.address,
        longitude: args.longitude,
        latitude: args.latitude,
        userAccountId: args.userAccountId,
        price: args.price,
      });
    }