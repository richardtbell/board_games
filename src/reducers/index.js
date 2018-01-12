import { combineReducers } from 'redux'
import users from './users'
import games from './games'
import loggedInUser from './loggedInUser'
import { reducer as form } from 'redux-form'

const boardGameApp = combineReducers({
    users, games, loggedInUser, form
})

export default boardGameApp
