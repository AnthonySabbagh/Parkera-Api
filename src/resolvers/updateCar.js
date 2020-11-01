module.exports = function(parent, args, CarInfo){
    return CarInfo.findByPk(args.id).then((car) => {
        return car
          .update({
            license: args.license,
            model: args.model,
            color: args.color,
          })
          .then((car) => {
            console.log(car.dataValues);
            return car.dataValues;
          });
      });
    }