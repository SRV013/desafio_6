//require('dotenv').config()  
const admin = require("firebase-admin");
//const serviceAccount =process.env.KEY_DB;
const serviceAccount = require("/etc/secrets/key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
    databaseURL: "https://desafio-seis-default-rtdb.firebaseio.com"
});
const firestore = admin.firestore();
const rtdb = admin.database();
export { firestore, rtdb };
