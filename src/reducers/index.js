import { combineReducers } from 'redux'
import users from './users'
import games from './games'

const boardGameApp = combineReducers({
    users, games
})

export default boardGameApp
