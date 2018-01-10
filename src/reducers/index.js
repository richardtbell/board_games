import { combineReducers } from 'redux'
import users from './users'
import games from './games'
import loggedInUser from './loggedInUser'

const boardGameApp = combineReducers({
    users, games, loggedInUser
})

export default boardGameApp
