module.exports = function (parent, args, AuthenticationInfos){
    return AuthenticationInfos.findAll({
        where: {
          email: args.email,
        },
      });
    }