import { SIGN_IN } from '../actions/signIn'

const loggedInUser = (state = {}, action) => {
    switch (action.type) {
        case SIGN_IN:
            return action.user
        default:
            return state
    }
}

export default loggedInUser
