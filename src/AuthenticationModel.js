const { Sequelize, Model, DataTypes } = require("sequelize");
("use strict");
module.exports = (sequelize, DataTypes) => {
    var Authentication_info = sequelize.define("authentication_info", {
        password: DataTypes.STRING,
        is_login: {type: DataTypes.BOOLEAN, defaultValue: false},
        email: {type: DataTypes.STRING, unique: true}
    });
    return Authentication_info;
};
