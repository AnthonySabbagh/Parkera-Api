module.exports = function (parent, args, Booking){
    return Booking.findAll({
        raw: true,
        where: {
        parkingSpotId: args.parkingSpotId,
        },
    });
}