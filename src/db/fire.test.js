import { saveUser, findUserBy, addGame, addGameToUser, toggleAttendance } from './fire'

function isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

describe('saveUser', () => {
    it('should return a promise', () => {
        expect(isPromise(saveUser({}))).toBe(true)
    })
})

describe('findUserBy', () => {
    it('should return a promise', () => {
        expect(isPromise(findUserBy({}))).toBe(true)
    })
})

describe('addGame', () => {
    it('should return a promise', () => {
        expect(isPromise(addGame({}))).toBe(true)
    })
})

describe('addGameToUser', () => {
    it('should return a promise', () => {
        expect(isPromise(addGameToUser('', {}))).toBe(true)
    })
})

describe('toggleAttendance', () => {
    it('should return a promise', () => {
        expect(isPromise(toggleAttendance({}))).toBe(true)
    })
})