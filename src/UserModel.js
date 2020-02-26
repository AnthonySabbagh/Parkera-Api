const { Sequelize, Model, DataTypes } = require("sequelize");
("use strict");
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define("user_account", {
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        email: {type: DataTypes.STRING, unique: true},
        phone: DataTypes.STRING,
        user_role: {
            type: DataTypes.STRING,
            validate: {
                is: /^(User)|(Owner)$/i
            }
        }
    });
    return User;
};
