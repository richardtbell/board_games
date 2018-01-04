import { combineReducers } from 'redux'
import { ADD_USER } from '../actions/addUser'
import { ADD_GAME_FOR_USER } from '../actions/addGame'
import { ADD_DATA_FROM_FIREBASE } from '../actions/addDataFromFirebase'
import fire from '../fire'

const users = (state = [], action) => {
    switch (action.type) {
        case ADD_USER:
            fire.database().ref('users').push( action.user );
            return [...state, 
                action.user
            ]
        case ADD_GAME_FOR_USER:
            return state.map(user => {
                if (user.id === action.action.userId) {
                    const updatedUser = {...user, games: [...user.games, action.action.game]}
                    fire.database().ref('/users/' + user.id).update({name: updatedUser.name, games: updatedUser.games})
                    return updatedUser 
                } else {
                    return user
                }
            })
        case ADD_DATA_FROM_FIREBASE:
            return action.data.users || state
        default:
            return state
    }
}

const games = (state = [], action) => {
    switch (action.type) {
        case ADD_GAME_FOR_USER:
            fire.database().ref('games').push( action.action.game );
            return [...new Set([...state, action.action.game])]
        case ADD_DATA_FROM_FIREBASE:
            return action.data.games || state            
        default:
            return state
    }
}

const boardGameApp = combineReducers({
    users, games
})

export default boardGameApp
