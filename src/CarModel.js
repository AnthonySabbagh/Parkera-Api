const { Sequelize, Model, DataTypes } = require("sequelize");

("use strict");
module.exports = (sequelize, DataTypes) => {
    var Car_info = sequelize.define("car_info", {
        cid:{
            type: DataTypes.INTEGER,
            primaryKey: true
          },
        license: DataTypes.STRING,
        model: DataTypes.STRING,
        color: DataTypes.STRING,
        uid:DataTypes.INTEGER
    },
    {
        timestamps: false,
    });
    return Car_info;
};