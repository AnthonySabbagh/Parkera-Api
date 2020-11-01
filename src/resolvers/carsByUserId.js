module.exports = function (parent, args, CarInfo){
    return CarInfo.findAll({
        raw: true,
        where: {
          userAccountId: args.userAccountId,
        },
    });
}