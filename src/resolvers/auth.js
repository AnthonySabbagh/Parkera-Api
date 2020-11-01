module.exports = function (parent, args, AuthenticationInfos){
    autheticationInfos = AuthenticationInfos.findAll({ raw: true });
    return autheticationInfos;
}
