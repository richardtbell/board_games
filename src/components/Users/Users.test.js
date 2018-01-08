import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Users } from './Users'
import AddNewGameForm from '../AddNewGameForm/AddNewGameForm'
import AddNewUserForm from '../AddNewUserForm/AddNewUserForm'
import { Title } from '../UI'

configure({ adapter: new Adapter() })


describe('<Users />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <Users users={[{ name: 'test', games: [], id: 1 }, { name: 'test2', games: [], id: 2 }]} />
        )
    })

    it('should render a title', () => {
        expect(wrapper.find(Title)).toHaveLength(1)
        expect(wrapper.find(Title).props().children).toEqual('Users')
    })

    it('should render a list of Users', () => {
        expect(wrapper.find('li')).toHaveLength(2)
    })

    it('should render a list of Games for each user', () => {
        expect(wrapper.find('Games')).toHaveLength(2)
    })

    it('should render an AddNewGameForm for each user', () => {
        expect(wrapper.find(AddNewGameForm)).toHaveLength(2)
    })

    it('should render an AddNewUserForm', () => {
        expect(wrapper.find(AddNewUserForm)).toHaveLength(1)
    })

})
