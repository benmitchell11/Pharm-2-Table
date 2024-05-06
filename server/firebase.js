import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyBdBZqi3ZXRunAIlfbfiLKXz_jXi1ZcOcU",
  authDomain: "pharm2table-a54f3.firebaseapp.com",
  databaseURL: "https://pharm2table-a54f3-default-rtdb.firebaseio.com",
  projectId: "pharm2table-a54f3",
  storageBucket: "pharm2table-a54f3.appspot.com",
  messagingSenderId: "208407547907",
  appId: "1:208407547907:web:4d5e39171058582df93e36"
};

const app = initializeApp(firebaseConfig);
const auth  = getAuth(app);
const database = getDatabase(app)
const storage = getStorage(app);

export { auth, database, storage };
export default app;
