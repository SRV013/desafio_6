require('dotenv').config()  
const admin = require("firebase-admin");
// const serviceAccount =process.env.KEY_DB;

const serviceAccount =
{
    "type": "service_account",
    "project_id": "desafio-seis",
    "private_key_id": "12ae024f954decacede790de4c98615c61a302d9",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCajUj7TM9leLuY\nc2AsagGWc27EhoX5/F3DzvPUGWp+fDAMGy4SfT/7Rh8ei6jrQ5E4/1zo69vd526t\n1NS+jimNZQIk64e7Qd3d+mavljU5raxf58tLE7lnVM9X0gYK3OnKxT8rjRHDAyOl\n69ejHK8IRzC59fkl/CX1vcXdE9KyDhYWdC4Ap8LVjdm/gIgpmTi1vWW/nSUM3Snt\nmWzqFzVpvMqyn+mobhBN2Bp15Hl9GCuLcMeX/9HDX3hkroFs8aRuo/p1aeRSeD+y\nRHrK9Ge74A2q9JYzu69IbRQ/PiZhqK3L5wvRpM8vNVIe/V+e4v181tK+RN99JofO\nKAKa4whJAgMBAAECggEAGtdq02o1otPjEMkI7O3ENNL7a9pJLm9sAXPR2QZI/oqm\n9ZNK3x8tm4BEK1PqFGH5uMJw6mr8Fn/5MuuBv06FXO8r/imBuz3nQIQajWgy+j91\nbnqdTf6w9oc+M2xgbEaNvA+htvibGxlSeaCKJOP4aiGjDsjvam9uUE2TLaAhuZZ/\nmj0p3M8u0Xu5eS8Nepn1tmek5A3BAKnX1OoRnOmiKCbJWgsQ0VVeVDOU2m01fge/\nhhTZKWcuYsvAL0ijItwPCjXCajtTwA9uQy2nF6yfPFInI7d1qgnys3+lZ9cp2WkD\ndKTNwYESiY4j0kQyfv3Vk1s0vFbJOLNTHHFIDinSWQKBgQDJywdvEb6xUt50sSmR\n+doS/UV2P1+QbhjChOcMBf/mBs937JzJAl+ECfz59WHcvofte09Zv18LwL7TxzED\njeNO2RU9zYQtYAeKWW/Y0Y68RuOZSq5pe92JD1fGrs4KTgDaJV6Y05USZ1gs9Lwr\nU6NoqSYRx8D1mVSGTt32GzttKwKBgQDEEY8cXTsgVwoDvJfbkG2s7qSTKDGXWtLJ\nlyqybHPRFAFOncmqG9Gl6kvU1wL/GFJ9ic1Ty5M8/dswce2JIOJ6VFvYxUb4DTlI\nHSPAk/dZp/dLLJ6rt6bNnkmwLd3gPG+fhceBvXJih7PRzUYXHjZv3myDE37LoLFl\nrics8bCuWwKBgHIg/EFbXejYn6yMDqDbGPWofULVsOz099f8ZtisBAFLVMfU8Q/W\n4cLCC2wr1n+M2z/7f/OYgt8Y0lTg0d3av/b2XEcqF1m6eElNMC8Gxp3B0jP+wwox\n3igIn3Jlp264k07N1+TDtgpEnOBAQrSWh1NIZ5miyoWdhOq5bFwnJsMlAoGAJOEE\noRosL+YPPSqxCZx99KQikodh5I0xzrc/UbYyhqYTpNzq/LMk2OdcAhm7N440neZY\nl6VX+YXqP49+VWe5EbdiW0CoG6opFxZcDjIGuXdtfVdUNQpjNpPKWngWHsJfYIsC\nPrYKmNvbh9/rihelt58HnBQDqnt8QpriRYLkb7cCgYEAiiBeTTBeQkGhR8htJw0S\nqGMYTkkHSTiOwikOL3NqgS1MzpnQyR4m0EYciLX3Tx4mbJg4czxCANx33gfcJpFV\nNUTuys7OLVDr7+ghp9r3w5rsPjmtuTWsX0P1etZHpHINgBSL/JvBIlPGbIZ3mQkK\nQR3Hb0Dt61exnth7F8WbcR4=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-zzxau@desafio-seis.iam.gserviceaccount.com",
    "client_id": "105926263252430398849",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zzxau%40desafio-seis.iam.gserviceaccount.com"
  }
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
    databaseURL: "https://desafio-seis-default-rtdb.firebaseio.com"
});
const firestore = admin.firestore();
const rtdb = admin.database();
export { firestore, rtdb };