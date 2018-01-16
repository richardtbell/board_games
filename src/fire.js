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
    return new Promise((resolve, reject) => {
        findUserBy({ field: 'uid', value: user.uid }).then(foundUser => {
            if (foundUser) {
                const updates = {}
                const updatedUser = { ...foundUser, ...user }
                updates['/users/' + foundUser.id] = updatedUser
                fire.database().ref().update(updates)
                resolve(updatedUser)
            } else {
                fire.database().ref('/users/').push(user).then(response => {
                    resolve({ ...user, id: response.key })
                })
            }
        })
    })
}


export const findUserBy = ({ field, value }) => {
    return fire.database().ref('users').once('value').then(snapshot => {
        const users = snapshot.val()
        for (var id in users) {
            if (users.hasOwnProperty(id) && users[id][field] === value) {
                return { ...users[id], id: id }
            }
        }
    })
}

export const addGame = (game) => {
    return fire.database().ref('/games').push(game);
}

export const addGameToUser = (userId, game) => {
    const updates = {}
    updates['/users/' + userId + '/games/' + game.id] = true
    fire.database().ref().update(updates);
}

export const toggleAttendance = (user) => {
    const updates = {}
    updates['/users/' + user.id + '/attending'] = !user.attending
    fire.database().ref().update(updates);
}

export default fire;