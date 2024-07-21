import * as firebase from "firebase";
import "@firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAPfes9_2EwZESX1puYMUv29yunzK9Ve5U",
    authDomain: "docman-31d96.firebaseapp.com",
    databaseURL: "https://docman-31d96.firebaseio.com",
    projectId: "docman-31d96",
    storageBucket: "docman-31d96.appspot.com",
    messagingSenderId: "649332068608",
    appId: "1:649332068608:web:f80be0be6e581d8c5323e5",
    measurementId: "G-JV3CQ2Y3VV"
};
firebase.initializeApp(firebaseConfig);
export default firebase;