import games from './games'
import { addGameForUser } from '../actions/addGame'
import { addDataFromFirebase } from '../actions/addDataFromFirebase'

describe('games reducer', () => {
    it('should return the same state when no action', () => {
        expect(games([{}], {})).toEqual([{}])
    })

    describe('ADD_DATA_FROM_FIREBASE', () => {
        it('should return previous state when no games loaded from firebase', () => {
            expect(games([], addDataFromFirebase({}))).toEqual([])
        })

        it('should add games when data loaded from firebase', () => {
            expect(games([], addDataFromFirebase({ games: [{ name: 'game' }] }))).toEqual([{ name: 'game' }])
        })
    })

    describe('ADD_GAME_FOR_USER', () => {
        it('should return previous state when no games added to user', () => {
            expect(games([], addGameForUser({}))).toEqual([])
        })

        it('should add game when game added to user', () => {
            expect(games([], addGameForUser({ game: { name: 'game' } }))).toEqual([{ name: 'game' }])
        })

        it('should only add game when game added to user is not in list', () => {
            expect(games([{ name: 'game' }], addGameForUser({ game: { name: 'game' } }))).toEqual([{ name: 'game' }])
        })
    })
})
