module.exports = function (parent, args, ParkingSpot){
    return ParkingSpot.findAll({
        raw: true,
        where: {
        userAccountId: args.userAccountId,
        },
    });
}