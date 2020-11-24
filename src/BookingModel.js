const { Sequelize, Model, DataTypes } = require("sequelize");

("use strict");
module.exports = (sequelize, DataTypes) => {
    var Booking = sequelize.define("booking", {
        duration: DataTypes.INTEGER,
    });
    return Booking;
};
