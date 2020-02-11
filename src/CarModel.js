const { Sequelize, Model, DataTypes } = require("sequelize");

("use strict");
module.exports = (sequelize, DataTypes) => {
    var Car_info = sequelize.define("car_info", {
        license: DataTypes.STRING,
        model: DataTypes.STRING,
        color: DataTypes.STRING
    },
    {
        timestamps: false,
    });
    return Car_info;
};