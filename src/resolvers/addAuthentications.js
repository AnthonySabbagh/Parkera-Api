module.exports = function(parent, args, AuthenticationInfos){
    return AuthenticationInfos.create({
        email: args.email,
        password: args.password,
        userAccountId: args.userAccountId,
    });
}