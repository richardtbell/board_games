import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import User from './User'
import AddNewGameForm from '../AddNewGameForm/AddNewGameForm'

configure({ adapter: new Adapter() })


describe('<User />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <User user={{ name: 'test', games: [], id: 1 }} />
        )
    })

    it('should render a li', () => {
        expect(wrapper.find('li')).toHaveLength(1)
    })

    describe('initial state', () => {
        it('should not render Games', () => {
            expect(wrapper.find('Games')).toHaveLength(0)
        })

        it('should not render AddNewGameForm', () => {
            expect(wrapper.find(AddNewGameForm)).toHaveLength(0)
        })

        it('should render a button to show games', () => {
            expect(wrapper.find('button')).toHaveLength(1)
        })
    })

    describe('when show games is clicked', () => {
        beforeEach(() => {
            wrapper.find('button').simulate('click')
        })

        it('should setState', () => {
            expect(wrapper.state().showGames).toBe(true)
        })

        it('should render Games', () => {
            expect(wrapper.find('Games')).toHaveLength(1)
        })

        it('should render AddNewGameForm', () => {
            expect(wrapper.find(AddNewGameForm)).toHaveLength(1)
        })
    })

})
