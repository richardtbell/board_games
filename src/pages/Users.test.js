import UsersPage from './Users'
import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Users from '../components/Users/Users'

configure({ adapter: new Adapter() })

describe('<UsersPage />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<UsersPage />)
    })

    it('should render <Users/>', () => {
        expect(wrapper.find(Users)).toHaveLength(1)
    })
})