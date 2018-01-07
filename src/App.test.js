import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { App } from './App'

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