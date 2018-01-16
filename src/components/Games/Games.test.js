import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Games } from './Games'

configure({ adapter: new Adapter() })


describe('<Games />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <Games games={[{ name: 'test' }, { name: 'test2' }]} />
        )
    })

    it('should render a ul', () => {
        expect(wrapper.find('ul')).toHaveLength(1)
    })

    it('should render a list of games', () => {
        expect(wrapper.find('li')).toHaveLength(2)
    })

})
