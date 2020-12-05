module.exports = function (parent, args, Booking){
    return Booking.findAll({
        raw: true,
        where: {
        parkSpotId: args.parkingSpotId,
        },
    });
}