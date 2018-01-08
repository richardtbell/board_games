import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { App, getPlayersAttending, getPlayersGames } from './App'

configure({ adapter: new Adapter() })

describe('<App />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<App games={[]} users={[]} />)
    })

    it('should render <Users />', () => {
        expect(wrapper.find('Users')).toHaveLength(1)
    })

    it('should render <Event />', () => {
        expect(wrapper.find('Event')).toHaveLength(1)
    })

    it('should render <SortedGamesList />', () => {
        expect(wrapper.find('SortedGamesList')).toHaveLength(1)
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
    it('should return an empty array when nothing is passed', () => {
        expect(getPlayersGames()).toEqual([])
    })

    it('should return an empty array when an empty array is passed', () => {
        expect(getPlayersGames([])).toEqual([])
    })

    it('should return empty array when no players are attending', () => {
        expect(getPlayersGames([{ id: 1, attending: false, games: [{ name: 'fake' }] }])).toEqual([])
    })

    it('should return empty array when the attending player has no games', () => {
        expect(getPlayersGames([{ id: 1, attending: false, games: [] }])).toEqual([])
    })

    it('should return an array with the players games when one player is attending', () => {
        const player = { id: 1, attending: true, games: [{ name: 'fake' }] }
        expect(getPlayersGames([player])).toEqual([{ name: 'fake' }])
    })

    it('should return an array with the attending players game when one player is attending and another is not', () => {
        const attendingPlayer = { id: 1, attending: true, games: [{ name: 'fake' }] }
        const player = { id: 2, attending: false, games: [{ name: 'shouldnt show' }] }
        expect(getPlayersGames([player, attendingPlayer])).toEqual([{ name: 'fake' }])
    })

    it('should return an array with the players games when two players are attending', () => {
        const player = { id: 1, attending: true, games: [{ name: 'fake' }] }
        const player2 = { id: 1, attending: true, games: [{ name: 'fake2' }] }
        expect(getPlayersGames([player, player2])).toEqual([{ name: 'fake' }, { name: 'fake2' }])
    })
})