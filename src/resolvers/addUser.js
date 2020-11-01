module.exports = function(parent, args, User, AuthenticationInfos){
    return User.create({
        firstname: args.firstname,
        lastname: args.lastname,
        user_role: args.user_role,
        email: args.email,
        phone: args.phone,
      })
        .then((resp) => {
          const user = resp.dataValues;

          AuthenticationInfos.create({
            password: args.password,
            is_login: true,
            email: user.email,
            userAccountId: user.id,
          })
            .then((resp) => {
              return resp;
            })
            .catch((err) => {
              console.log(err);
            });
          return resp;
        })
        .catch((err) => {
          throw new Error(err.errors[0].message);
        });
}