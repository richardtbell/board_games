import { ADD_USER } from '../actions/addUser'
import { ADD_GAME_FOR_USER } from '../actions/addGame'
import { ADD_DATA_FROM_FIREBASE } from '../actions/addDataFromFirebase'
import { TOGGLE_ATTENDANCE } from '../actions/toggleAttendance'
import { SIGN_IN } from '../actions/signIn'
import { UPDATE_USER } from '../actions/updateUser'

function userExists(state, action) {
    return state.some(user => user.uid === action.user.uid);
}

const users = (state = [], action) => {
    switch (action.type) {
        case ADD_USER:
            if (!action.user) {
                return state
            }
            return [...state,
            action.user
            ]
        case SIGN_IN:
            if (!action.user || userExists(state, action)) {
                return state
            }
            return [...state,
            action.user
            ]
        case UPDATE_USER:
            if (!action.user) {
                return state
            }
            return state.map(user => {
                if (user.id === action.user.id) {
                    return { ...action.user }
                } else {
                    return user
                }
            })
        case ADD_GAME_FOR_USER:
            return state.map(user => {
                if (user.id === action.userId) {
                    const game = {}
                    game[action.game.id] = true
                    const updatedUser = { ...user, games: { ...user.games, ...game } }
                    return updatedUser
                } else {
                    return user
                }
            })
        case ADD_DATA_FROM_FIREBASE:
            return action.data.users || state
        case TOGGLE_ATTENDANCE:
            return state.map(user => {
                if (user.id === action.userId) {
                    const updatedUser = { ...user, attending: !user.attending }
                    return updatedUser
                } else {
                    return user
                }
            })
        default:
            return state
    }
}

export default users
