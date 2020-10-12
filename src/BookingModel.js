const { Sequelize, Model, DataTypes } = require("sequelize");

("use strict");
module.exports = (sequelize, DataTypes) => {
    var Booking = sequelize.define("booking", {
        totalCost: DataTypes.DECIMAL,
        startTime: DataTypes.DATE,
        endTime: DataTypes.DATE
    });
    return Booking;
};
