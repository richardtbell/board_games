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

export const saveUser = (user) => {
    fire.database().ref('users').push(user);
}

export const addGame = (game) => {
    fire.database().ref('/games').push(game);
}

export const addGameToUser = (userId, game) => {
    fire.database().ref('/users/' + userId + '/games').push(game);
}

export default fire;