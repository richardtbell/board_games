import { ADD_GAME_FOR_USER } from '../actions/addGame'
import { ADD_DATA_FROM_FIREBASE } from '../actions/addDataFromFirebase'
import { removeDuplicateObjectsFromArray } from '../utils'

const games = (state = [], action) => {
    switch (action.type) {
        case ADD_GAME_FOR_USER:
            if (!action.game) {
                return state
            }
            return removeDuplicateObjectsFromArray([...state, action.game])
        case ADD_DATA_FROM_FIREBASE:
            return action.data.games || state
        default:
            return state
    }
}

export default games
