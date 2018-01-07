import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Event from './Event'

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
