const { Sequelize, Model, DataTypes } = require("sequelize");

("use strict");
module.exports = (sequelize, DataTypes) => {
  var Park_spots = sequelize.define("park_spots", {
    address: DataTypes.STRING,
    longitude: DataTypes.DECIMAL,
    latitude: DataTypes.DECIMAL,
    price: DataTypes.DECIMAL,
  });
  return Park_spots;
};
