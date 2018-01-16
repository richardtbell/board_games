import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { AddNewGameForm, addNewGame } from './AddNewGameForm'
import { addGameForUser } from '../../actions/addGame'

configure({ adapter: new Adapter() })

describe('<AddNewGameForm />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <AddNewGameForm userId={1} />, { disableLifecycleMethods: true }
        )
    })

    it('should render a form', () => {
        expect(wrapper.find('form')).toHaveLength(1)
    })

    it('should start with empty fields', () => {
        expect(wrapper.find('input').at(0).text()).toEqual('')
        expect(wrapper.find('input').at(1).text()).toEqual('')
        expect(wrapper.find('input').at(2).text()).toEqual('')
    })

    it('should update the state when text is entered', () => {
        const input = wrapper.find('input').at(0)
        expect(input.text()).toEqual('')
        input.simulate('change', { target: { value: 'Changed' } })
        expect(wrapper.state('name')).toEqual('Changed')
    })

    it('should update the value of the input when the state is changed', () => {
        const input = wrapper.find('input').at(0)
        expect(input.text()).toEqual('')
        wrapper.setState({ name: 'Changed' })
        expect(wrapper.find('input').at(0).prop('value')).toEqual('Changed')
    })

    describe('submit', () => {
        let focusCalled

        beforeEach(() => {
            focusCalled = false
            wrapper.instance().nameInput = { focus: () => { focusCalled = true } }
        })

        it('should preventDefault', () => {
            let preventDefaultCalled = false
            wrapper.setProps({ addNewGame: () => { } })
            expect(preventDefaultCalled).toBe(false)
            wrapper.find('form').simulate('submit', { preventDefault() { preventDefaultCalled = true } })
            expect(preventDefaultCalled).toBe(true)
        })

        it('should call addNewGame', () => {
            let addNewGameCalled = false
            wrapper.setProps({ addNewGame: () => { addNewGameCalled = true } })
            expect(addNewGameCalled).toBe(false)
            wrapper.find('form').simulate('submit', { preventDefault() { } })
            expect(addNewGameCalled).toBe(true)
        })

        it('should reset the state', () => {
            wrapper.setProps({ addNewGame: () => { } })
            wrapper.setState({ name: 'Changed' })
            expect(wrapper.state()).toEqual({
                name: 'Changed',
                minPlayers: '',
                maxPlayers: ''
            })
            wrapper.find('form').simulate('submit', { preventDefault() { } })
            expect(wrapper.state()).toEqual({
                name: '',
                minPlayers: '',
                maxPlayers: ''
            })
        })

        it('should focus on the first element', () => {
            wrapper.setProps({ addNewGame: () => { } })
            expect(focusCalled).toBe(false)
            wrapper.find('form').simulate('submit', { preventDefault() { } })
            expect(focusCalled).toBe(true)
        })
    })

    describe('addNewGame', () => {
        let dispatchCalled
        let dispatchArgs
        let addGameCalled
        let addGameToUserCalled
        const mockDispatch = args => {
            dispatchCalled = true
            dispatchArgs = args
        }
        const fire = require('../../fire')
        fire.addGame = () => {
            addGameCalled = true
            return {
                then: callback => {
                    callback({ key: 1 })
                }
            }
        }
        fire.addGameToUser = () => { addGameToUserCalled = true }

        beforeEach(() => {
            dispatchCalled = false
            dispatchArgs = null
            addGameCalled = false
            addGameToUserCalled = false
        })

        it('should not dispatch if the game name is empty', () => {
            expect(dispatchCalled).toBe(false)
            addNewGame(mockDispatch, 1, { name: '' })
            expect(dispatchCalled).toBe(false)
        })

        it('should dispatch an action to add a game to the user', () => {
            expect(dispatchCalled).toBe(false)
            addNewGame(mockDispatch, 1, { name: 'test' })
            expect(dispatchCalled).toBe(true)
            expect(dispatchArgs).toEqual(addGameForUser({ userId: 1, game: { id: 1, name: 'test' } }))
        })

        it('should add the game to the database', () => {
            expect(addGameCalled).toBe(false)
            addNewGame(mockDispatch, 1, { name: 'test' })
            expect(addGameCalled).toBe(true)
        })

        it('should add the game to the user in the database', () => {
            expect(addGameToUserCalled).toBe(false)
            addNewGame(mockDispatch, 1, { name: 'test' })
            expect(addGameToUserCalled).toBe(true)
        })
    })
})
