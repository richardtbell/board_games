import { getUserDetails } from './getUserDetails'

describe('getUserDetails', () => {
    const user = { displayName: 'bob', email: 'test@test.com', uid: 1 }

    it('should return only the key value pairs that are relevant', () => {
        expect(getUserDetails({ ...user, fake: 'remove' })).toEqual({ displayName: 'bob', email: 'test@test.com', uid: 1 })
    })
})
