import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AppropriateGamesList from './AppropriateGamesList'

configure({ adapter: new Adapter() })

describe('<AppropriateGamesList />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<AppropriateGamesList numberOfPlayers={0}
            games={[{ name: '2 player game', minPlayers: 2, maxPlayers: 2 }]} />)
    })

    it('should render <Games />', () => {
        expect(wrapper.find('Games')).toHaveLength(1)
    })

    it('should not show games with fewer than required players', () => {
        wrapper.setProps({ numberOfPlayers: 1 })
        expect(wrapper.find('Games').props().games).toHaveLength(0)
    })

    it('should not show games with more players than available', () => {
        wrapper.setProps({ numberOfPlayers: 3 })
        expect(wrapper.find('Games').props().games).toHaveLength(0)
    })

    it('should show games with the right number of players', () => {
        wrapper.setProps({ numberOfPlayers: 2 })
        expect(wrapper.find('Games').props().games).toHaveLength(1)
    })
})
