import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { AddNewUserForm, addNewUser } from './AddNewUserForm'
import { addUser } from '../../actions/addUser'

configure({ adapter: new Adapter() })

describe('<AddNewUserForm />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <AddNewUserForm />
        )
    })

    it('should render a form', () => {
        expect(wrapper.find('form')).toHaveLength(1)
    })

    it('should call addNewUser on form submit', () => {
        let addNewUserCalled = false
        wrapper.setProps({ addNewUser: () => addNewUserCalled = true })
        expect(addNewUserCalled).toBe(false)
        wrapper.find('form').simulate('submit', { preventDefault() { } })
        expect(addNewUserCalled).toBe(true)
    })

    it('should preventDefault on form submit', () => {
        let preventDefaultCalled = false
        wrapper.setProps({ addNewUser: () => { } })
        expect(preventDefaultCalled).toBe(false)
        wrapper.find('form').simulate('submit', { preventDefault() { preventDefaultCalled = true } })
        expect(preventDefaultCalled).toBe(true)
    })

    describe('addNewUser', () => {
        let dispatchArgs
        let input
        let saveUserCalled
        const dispatch = (args) => { dispatchArgs = args }
        const fire = require('../../fire')
        fire.saveUser = () => { saveUserCalled = true }

        beforeEach(() => {
            dispatchArgs = null
            input = wrapper.find('input')
            input.value = 'Bob'
            saveUserCalled = false
        })

        it('should not do anthing if theres no text in the input', () => {
            input.value = ''
            expect(addNewUser(dispatch, input)).toEqual(undefined)
        })

        it('should dispatch an action to add the user', () => {
            addNewUser(dispatch, input)
            expect(dispatchArgs).toEqual(addUser({ name: 'Bob', games: [] }))
        })

        it('should reset the input to an empty string', () => {
            addNewUser(dispatch, input)
            expect(input.value).toEqual('')
        })

        it('should save the user in the database', () => {
            expect(saveUserCalled).toBe(false)
            addNewUser(dispatch, input)
            expect(saveUserCalled).toBe(true)
        })
    })
})
