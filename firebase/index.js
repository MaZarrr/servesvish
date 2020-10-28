var admin = require("firebase-admin");
// require('dotenv').config();

var serviceAccount = require("../config/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE
});

module.exports = admin;