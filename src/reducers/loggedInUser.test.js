import loggedInUser from './loggedInUser'
import { signIn } from '../actions/signIn'

describe('loggedInUser reducer', () => {
    it('should return the same state when no action', () => {
        expect(loggedInUser({ initialState: true }, {})).toEqual({ initialState: true })
    })

    describe('SIGN_IN', () => {
        it('should return previous state when no user passed', () => {
            expect(loggedInUser({ initialState: true }, signIn())).toEqual({ initialState: true })
        })

        it('should update state with user', () => {
            const user = { name: 'fake user' }
            expect(loggedInUser({ initialState: true }, signIn(user))).toEqual(user)
        })
    })
})