module.exports = function(parent, args, Booking){
    return Booking.destroy({
        where: {
            id: args.id
        }
        })
    }