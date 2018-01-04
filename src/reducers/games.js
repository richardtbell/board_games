import { combineReducers } from 'redux'
import { ADD_USER } from '../actions/addUser'
import { ADD_GAME_FOR_USER } from '../actions/addGame'
import { ADD_DATA_FROM_FIREBASE } from '../actions/addDataFromFirebase'
import fire from '../fire'


const games = (state = [], action) => {
    switch (action.type) {
        case ADD_GAME_FOR_USER:
            return [...new Set([...state, action.action.game])]
        case ADD_DATA_FROM_FIREBASE:
            return action.data.games || state            
        default:
            return state
    }
}

export default games
