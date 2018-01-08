import users from './users'
import { ADD_USER, addUser } from '../actions/addUser'
import { ADD_GAME_FOR_USER, addGameForUser } from '../actions/addGame'
import { ADD_DATA_FROM_FIREBASE, addDataFromFirebase } from '../actions/addDataFromFirebase'
import { TOGGLE_ATTENDANCE, toggleAttendance } from '../actions/toggleAttendance'

describe('users reducer', () => {
    it('should return the same state when no action', () => {
        expect(users([{}], {})).toEqual([{}])
    })

    describe('ADD_DATA_FROM_FIREBASE', () => {
        it('should return previous state when no users loaded from firebase', () => {
            expect(users([], addDataFromFirebase({}))).toEqual([])
        })

        it('should add users when data loaded from firebase', () => {
            expect(users([], addDataFromFirebase({ users: [{ name: 'user' }] }))).toEqual([{ name: 'user' }])
        })
    })

    describe('ADD_USER', () => {
        it('should return previous state when no user added', () => {
            expect(users([], addUser())).toEqual([])
        })

        it('should add user to state', () => {
            expect(users([], addUser({ name: 'fake' }))).toEqual([{ name: 'fake' }])
        })

        it('should add a second user to state', () => {
            expect(users([{ name: 'fake2' }], addUser({ name: 'fake' }))).toEqual([{ name: 'fake2' }, { name: 'fake' }])
        })
    })

    describe('ADD_GAME_FOR_USER', () => {
        const user1 = { name: 'bob', id: 1, games: [] }
        const user2 = { name: 'alfred', id: 2, games: [] }
        const game = { name: 'game' }

        it('should return previous state when no games added to user', () => {
            expect(users([], addGameForUser({}))).toEqual([])
        })

        it('should add game to user', () => {
            expect(users([user1], addGameForUser({ game, userId: user1.id }))).toEqual([{ name: 'bob', id: 1, games: [{ name: 'game' }] }])
        })

        it('should add game to only correct user', () => {
            expect(users([user1, user2], addGameForUser({ game, userId: user1.id }))).toEqual([{ name: 'bob', id: 1, games: [{ name: 'game' }] }, user2])
        })
    })

    describe('TOGGLE_ATTENDANCE', () => {
        const user1 = { name: 'bob', id: 1, games: [], attending: false }
        const user2 = { name: 'jim', id: 2, games: [], attending: true }

        it('should return previous state when no userId in payload', () => {
            expect(users([], toggleAttendance({}))).toEqual([])
        })

        it('should return previous state when userId is incorrect', () => {
            expect(users([user1], toggleAttendance(9))).toEqual([user1])
        })

        it('should toggle attending', () => {
            expect(users([user1], toggleAttendance(user1.id))).toEqual([{ name: 'bob', id: 1, games: [], attending: true }])
            expect(users([user2], toggleAttendance(user2.id))).toEqual([{ name: 'jim', id: 2, games: [], attending: false }])
        })

        it('should toggle attending for the correct user', () => {
            expect(users([user1, user2], toggleAttendance(user1.id))).toEqual([{ name: 'bob', id: 1, games: [], attending: true }, user2])
        })
    })
})