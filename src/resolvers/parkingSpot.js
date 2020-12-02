module.exports = function (parent, args, ParkingSpot){
    return ParkingSpot.find({
        raw: true,
        where: {
          id: args.id,
        },
    });
}
