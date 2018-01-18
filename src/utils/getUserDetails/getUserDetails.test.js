import { getUserDetails, getUserNameFromEmail } from './getUserDetails'

describe('getUserDetails', () => {
    const user = { displayName: 'bob', email: 'test@test.com', uid: 1 }

    it('should return only the key value pairs that are relevant', () => {
        expect(getUserDetails({ ...user, fake: 'remove' })).toEqual({ displayName: 'bob', email: 'test@test.com', uid: 1 })
    })
})

describe('getUserNameFromEmail', () => {
    it('should return the first part of the email', () => {
        expect(getUserNameFromEmail('bob@example.com')).toEqual('bob')
    })
})