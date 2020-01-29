const { Sequelize, Model, DataTypes } = require("sequelize");
// const sequelize = new Sequelize("sqlite::memory:");

// class User extends Model {}
// User.init(
//   {
//     firstname: DataTypes.STRING,
//     lastname: DataTypes.STRING,
//     email: DataTypes.STRING,
//     phone: DataTypes.STRING,
//     user_role: DataTypes.STRING
//   },
//   { sequelize, modelName: "user_account" }
// );

// sequelize
//   .sync()
//   .then(() =>
//     User.create({
//       username: "janedoe",
//       birthday: new Date(1980, 6, 20)
//     })
//   )
//   .then(jane => {
//     console.log(jane.toJSON());
//   });

("use strict");
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("user_account", {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    user_role: DataTypes.STRING
  });

  return User;
};
