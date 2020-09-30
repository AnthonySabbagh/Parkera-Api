# Parkera-Api

This repository holds the code for the back end of the Parkera application. The API allows the client application to communicate with the database.

## Team
Zaid Saeed - 8621155 <br>
Anthony Sabbagh - 8735782 <br>
Pacifique N. Cyusa - 8522431 <br>
Weihao Huang - 7952021 <br>

## API documentation
### Queries
users: returns data of all users <br>
cars: returns data of all cars <br>
carsByUserId(userAccountId): returns the cars associated with the given user <br>
parkingSpotsByUserId(userAccountId): returns parking spots associated with the given user <br>
parkingSpots: returns data of all parking spots <br>
authenticationInfos: returns authentication data of all users (some of it encrypted) <br>
getAuthenticationbyEmail(email): returns authentication data of one user based on their email (some of it encrypted) <br>
### Mutations
addUser(firstnname, lastname, user_role, email, phone, password): adds a user <br>
addCar(licence, model, color, userAccountId): adds a car associated with the specified user <br>
updateCar(id, licence, model, color): updates the data of the specified car <br>
addParkingSpot(id, address, longitude, latitude, userAccountId, price): adds a parking spot associated with the specified user <br>
updateParkingSpot(id, address, longitude, latitude, price): updates the data of the specified parking spot <br>
addAuthentications(email, password, userAccountId): adds data for the authentication of a user <br>
