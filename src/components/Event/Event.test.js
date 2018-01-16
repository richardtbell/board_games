import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Event, getPlayersAttending, getPlayersGames } from './Event'
import { Games } from '../Games/Games'

configure({ adapter: new Adapter() })

describe('<Event />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Event players={[{ id: 1 }]}
            games={[{ name: '2 player game', minPlayers: 2, maxPlayers: 2, id: 1 }]} />)
    })

    it('should render <Games />', () => {
        expect(wrapper.find(Games)).toHaveLength(1)
    })

    it('should not show games with fewer than required players', () => {
        expect(wrapper.find(Games).props().games).toHaveLength(0)
    })

    it('should not show games with more players than available', () => {
        wrapper.setProps({ players: [{ id: 1 }, { id: 2 }, { id: 3 }] })
        expect(wrapper.find(Games).props().games).toHaveLength(0)
    })

    it('should show games with the right number of players', () => {
        wrapper.setProps({ players: [{ id: 1 }, { id: 2 }] })
        expect(wrapper.find(Games).props().games).toHaveLength(1)
    })
})


describe('getPlayersAttending', () => {
    it('should return empty array when nothing is passed', () => {
        expect(getPlayersAttending()).toEqual([])
    })

    it('should return empty array when empty array is passed', () => {
        expect(getPlayersAttending([])).toEqual([])
    })

    it('should return empty array when no players are attending', () => {
        expect(getPlayersAttending([{ id: 1, attending: false }])).toEqual([])
    })

    it('should return an array with the player when one player is attending', () => {
        const player = { id: 1, attending: true }
        expect(getPlayersAttending([player])).toEqual([player])
    })

    it('should return an array with the attending player when one player is attending and another is not', () => {
        const attendingPlayer = { id: 1, attending: true }
        const player = { id: 2, attending: false }
        expect(getPlayersAttending([player, attendingPlayer])).toEqual([attendingPlayer])
    })
})

describe('getPlayersGames', () => {
    const fakeGame = { id: 'fakeGame', name: 'fake' }
    const fakeGame2 = { id: 'fakeGame2', name: 'fake 2' }
    const games = [fakeGame, fakeGame2]

    it('should return an empty array when nothing is passed', () => {
        expect(getPlayersGames()).toEqual([])
    })

    it('should return an empty array when an empty object is passed', () => {
        expect(getPlayersGames({})).toEqual([])
    })

    it('should return empty array when no players are attending', () => {
        const state = {
            games,
            users: [{ id: 1, attending: false, games: { fakeGame: true } }]
        }
        expect(getPlayersGames(state)).toEqual([])
    })

    it('should return empty array when the attending player has no games', () => {
        const state = {
            games,
            users: [{ id: 1, attending: false, games: {} }]
        }
        expect(getPlayersGames(state)).toEqual([])
    })

    it('should return an array with the players games when one player is attending', () => {
        const state = {
            games,
            users: [{ id: 1, attending: true, games: { fakeGame: true } }],
        }
        expect(getPlayersGames(state)).toEqual([fakeGame])
    })

    it('should return an array with the attending players game when one player is attending and another is not', () => {
        const state = {
            games,
            users: [
                { id: 1, attending: true, games: { fakeGame: true } },
                { id: 2, attending: false, games: { fakeGame2: true } },
            ],
        }
        expect(getPlayersGames(state)).toEqual([fakeGame])
    })

    it('should return an array with the players games when two players are attending', () => {
        const state = {
            games,
            users: [
                { id: 1, attending: true, games: { fakeGame: true } },
                { id: 2, attending: true, games: { fakeGame2: true } },
            ],
        }
        expect(getPlayersGames(state)).toEqual([fakeGame, fakeGame2])
    })
})