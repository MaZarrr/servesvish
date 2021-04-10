var admin = require("firebase-admin");
// require('dotenv').config();

var serviceAccount = require("../config/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://svisni-sushi.firebaseio.com"
});

module.exports = admin;