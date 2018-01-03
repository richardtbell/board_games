import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyA67gAKDUSuRNu6at6tR4tuBC1RySL9iR0",
    authDomain: "boardgames-8a886.firebaseapp.com",
    databaseURL: "https://boardgames-8a886.firebaseio.com",
    projectId: "boardgames-8a886",
    storageBucket: "boardgames-8a886.appspot.com",
    messagingSenderId: "344443150790"
};

var fire = firebase.initializeApp(config);
export default fire;