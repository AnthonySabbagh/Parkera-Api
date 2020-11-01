module.exports = function (parent, args, CarInfo){
    console.log("cars query");
    cars = CarInfo.findAll({ raw: true });
    console.log("cars", cars);
    return cars;
}