import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth';


const config = {
  apiKey: "AIzaSyCm0-chT58okWoQTR-ZO-1ReVwjt3tbOE8",
  authDomain: "incidentmanager-d9f35.firebaseapp.com",
  databaseURL: "https://incidentmanager-d9f35.firebaseio.com",
  projectId: "incidentmanager-d9f35",
  storageBucket: "incidentmanager-d9f35.appspot.com",
  messagingSenderId: "27605567693",
  appId: "1:27605567693:web:09fb07a9b283522f"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
