import { SIGN_IN } from '../actions/signIn'

const loggedInUser = (state = {}, action) => {
    switch (action.type) {
        case SIGN_IN:
            if (!action.user) {
                return state
            }
            return action.user
        default:
            return state
    }
}

export default loggedInUser
