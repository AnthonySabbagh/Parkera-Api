module.exports = function(parent, args, Booking){
    return Booking.create({
        duration: args.duration,
        parkSpotId: args.parkSpotId,
        carInfoId: args.parkSpotId,
        userAccountId: args.userAccountId,
      });
    }