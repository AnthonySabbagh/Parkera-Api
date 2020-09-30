# Parkera-Api

This repository holds the code for the back end of the Parkera application. The API allows the client application to communicate with the database.

## Team
Zaid Saeed - 8621155
Anthony Sabbagh - 8735782
Pacifique N. Cyusa - 8522431
Weihao Huang - 7952021

## API documentation
### Queries
users: returns data of all users
cars: returns data of all cars
carsByUserId(userAccountId): returns the cars associated with the given user
parkingSpotsByUserId(userAccountId): returns parking spots associated with the given user
parkingSpots: returns data of all parking spots
authenticationInfos: returns authentication data of all users (some of it encrypted)
getAuthenticationbyEmail(email): returns authentication data of one user based on their email (some of it encrypted)
### Mutations
addUser(firstnname, lastname, user_role, email, phone, password): adds a user
addCar(licence, model, color, userAccountId): adds a car associated with the specified user
updateCar(id, licence, model, color): updates the data of the specified car
addParkingSpot(id, address, longitude, latitude, userAccountId, price): adds a parking spot associated with the specified user
updateParkingSpot(id, address, longitude, latitude, price): updates the data of the specified parking spot
addAuthentications(email, password, userAccountId): adds data for the authentication of a user
