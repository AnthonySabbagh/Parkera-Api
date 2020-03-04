const { Sequelize, Model, DataTypes } = require("sequelize");

("use strict");
module.exports = (sequelize, DataTypes) => {
  var AuthenticationInfo = sequelize.define("authentication_info", {
    password: DataTypes.STRING,
    is_login: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    userAccountId: DataTypes.INTEGER
  });
  return AuthenticationInfo;
};
