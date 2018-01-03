import { combineReducers } from 'redux'
import { ADD_USER } from '../actions/addUser'
import { ADD_GAME_FOR_USER } from '../actions/addGame'
import fire from '../fire'

const users = (state = [], action) => {
    switch (action.type) {
        case ADD_USER:
            fire.database().ref('users').push( action.user );
            return [...state, 
                action.user
            ]
        case ADD_GAME_FOR_USER:
            const userIndex = action.action.userId
            const user = Object.assign({}, state[userIndex])
            const games = [...user.games, action.action.game]
            user.games = games
            return [...state.slice(0, userIndex), user, ...state.slice(userIndex + 1)]
        default:
            return state
    }
}

const games = (state = [], action) => {
    switch (action.type) {
        case ADD_GAME_FOR_USER:
            fire.database().ref('games').push( action.action.game );
            return [...new Set([...state, action.action.game])]
        default:
            return state
    }
}

const boardGameApp = combineReducers({
    users, games
})

export default boardGameApp
