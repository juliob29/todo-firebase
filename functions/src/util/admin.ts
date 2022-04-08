import * as admin from "firebase-admin";


const firebaseConfig = {
  apiKey: "AIzaSyCEZn5hSntHlsLhgaS_JToxKmz0Ctiwy08",
  authDomain: "todo-e0f41.firebaseapp.com",
  databaseURL: "https://todo-e0f41-default-rtdb.firebaseio.com",
  projectId: "todo-e0f41",
  storageBucket: "todo-e0f41.appspot.com",
  messagingSenderId: "301771672350",
  appId: "1:301771672350:web:43ca635466c42682bdd70f",
  measurementId: "G-5C5RVX5ZN1"
};

admin.initializeApp(); // This should always come first
const db = admin.firestore();

export {firebaseConfig, db, admin};

