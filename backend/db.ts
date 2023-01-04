// import * as admin from "firebase-admin";
const admin = require("firebase-admin");
const serviceAccount = require("./key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
    databaseURL: "https://desafio-seis-default-rtdb.firebaseio.com"
});
const firestore = admin.firestore();
const rtdb = admin.database();
export { firestore, rtdb };