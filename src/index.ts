import dotenv from "dotenv";
import express from "express";
dotenv.config();
const port = process.env.SERVER_PORT || 3000;
const app = express();

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
