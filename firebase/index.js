var admin = require("firebase-admin");
require('dotenv').config();

var serviceAccount = require(process.env.PATH_TO_CONFIG_SERVICEACCOUNT);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE
});

module.exports = admin;