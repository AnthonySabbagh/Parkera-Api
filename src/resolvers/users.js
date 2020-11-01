module.exports = function (parent, args, User){
    console.log("user query");
    users = User.findAll({ raw: true });
    console.log("users", users);
    return users;
}