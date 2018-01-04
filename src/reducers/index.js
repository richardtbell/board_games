import { combineReducers } from 'redux'
import { ADD_USER } from '../actions/addUser'
import { ADD_GAME_FOR_USER } from '../actions/addGame'
import { ADD_DATA_FROM_FIREBASE } from '../actions/addDataFromFirebase'
import fire from '../fire'
import users from './users'
import games from './games'

const boardGameApp = combineReducers({
    users, games
})

export default boardGameApp
