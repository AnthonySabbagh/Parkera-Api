module.exports = function (parent, args, Booking){
    bookings = Booking.findAll({ raw: true });
    return bookings;
}