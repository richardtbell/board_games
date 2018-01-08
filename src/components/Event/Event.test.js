import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Event, getPlayersAttending, getPlayersGames } from './Event'

configure({ adapter: new Adapter() })

describe('<Event />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Event players={[]}
            games={[{ name: '2 player game', minPlayers: 2, maxPlayers: 2 }]} />)
    })

    it('should render <Games />', () => {
        expect(wrapper.find('Games')).toHaveLength(1)
    })

    it('should not show games with fewer than required players', () => {
        wrapper.setProps({ players: [{ id: 1 }] })
        expect(wrapper.find('Games').props().games).toHaveLength(0)
    })

    it('should not show games with more players than available', () => {
        wrapper.setProps({ players: [{ id: 1 }, { id: 2 }, { id: 3 }] })
        expect(wrapper.find('Games').props().games).toHaveLength(0)
    })

    it('should show games with the right number of players', () => {
        wrapper.setProps({ players: [{ id: 1 }, { id: 2 }] })
        expect(wrapper.find('Games').props().games).toHaveLength(1)
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