import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Users } from './Users'
import AddNewUserForm from '../AddNewUserForm/AddNewUserForm'

configure({ adapter: new Adapter() })


describe('<Users />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <Users users={[{ name: 'test', games: [], id: 1 }, { name: 'test2', games: [], id: 2 }]} />
        )
    })

    it('should render a ul', () => {
        expect(wrapper.find('ul')).toHaveLength(1)
    })

    it('should render a list of Users', () => {
        expect(wrapper.find('User')).toHaveLength(2)
    })

})
