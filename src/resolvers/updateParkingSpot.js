module.exports = function(parent, args, ParkingSpot){
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
    } 