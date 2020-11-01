module.exports = function(parent, args, Booking){
    return Booking.create({
        price: args.price,
        parkSpotId: args.parkSpotId,
        carInfoId: args.parkSpotId,
        userAccountId: args.userAccountId,
      });
    }