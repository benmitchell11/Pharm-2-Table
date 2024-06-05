const admin = require('firebase-admin');
const serviceAccount = require('../pharm2table-a54f3-firebase-adminsdk-jxv25-66455d7c9b.json'); // Update with your service account key path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pharm2table-a54f3-default-rtdb.firebaseio.com",
  storageBucket: "pharm2table-a54f3.appspot.com"
});

const createUserApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount), 
    databaseURL: "https://pharm2table-a54f3-default-rtdb.firebaseio.com",
  }, 'createUserApp');

module.exports = { admin, createUserApp };
