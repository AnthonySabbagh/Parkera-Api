module.exports = function (parent, args, ParkingSpot){
    spots = ParkingSpot.findAll({ raw: true });
    return spots;
}