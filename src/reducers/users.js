import { ADD_USER } from '../actions/addUser'
import { ADD_GAME_FOR_USER } from '../actions/addGame'
import { ADD_DATA_FROM_FIREBASE } from '../actions/addDataFromFirebase'

const users = (state = [], action) => {
    switch (action.type) {
        case ADD_USER:
            return [...state, 
                action.user
            ]
        case ADD_GAME_FOR_USER:
            return state.map(user => {
                if (user.id === action.action.userId) {
                    const updatedUser = {...user, games: [...user.games, action.action.game]}
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

export default users
