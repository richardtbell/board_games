import { SIGN_IN } from '../actions/signIn'
import { SIGN_OUT } from '../actions/signOut';

const loggedInUser = (state = {}, action) => {
    switch (action.type) {
        case SIGN_IN:
            if (!action.user) {
                return state
            }
            return action.user
        case SIGN_OUT:
            return {}
        default:
            return state
    }
}

export default loggedInUser
