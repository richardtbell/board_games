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

    it('should render a title', () => {
        expect(wrapper.find('h1')).toHaveLength(1)
        expect(wrapper.find('h1').text()).toEqual('Users')
    })

    it('should render a list of Users', () => {
        expect(wrapper.find('User')).toHaveLength(2)
    })

    it('should render an AddNewUserForm', () => {
        expect(wrapper.find(AddNewUserForm)).toHaveLength(1)
    })

})
