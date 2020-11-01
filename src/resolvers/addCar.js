module.exports = function(parent, args, CarInfo){
    return CarInfo.create({
        license: args.license,
        model: args.model,
        color: args.color,
        userAccountId: args.userAccountId,
      }); 
}