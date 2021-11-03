// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import {
  getFirestore
} from "firebase/firestore";
import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnqaVhoI59vUoQdJ1FZkhxBEAOlltfqOs",
  authDomain: "objetosperdidos-6455f.firebaseapp.com",
  projectId: "objetosperdidos-6455f",
  storageBucket: "objetosperdidos-6455f.appspot.com",
  messagingSenderId: "1017119667090",
  appId: "1:1017119667090:web:b89761baf7aa072805c74b",
  measurementId: "G-6XSCVV41DH"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  app
}
export default db;