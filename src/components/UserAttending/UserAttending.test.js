import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { UserAttending, handleCheckboxChange } from './UserAttending'
import { toggleAttendance } from '../../actions/toggleAttendance'

configure({ adapter: new Adapter() })

describe('<UserAttending />', () => {
    let wrapper
    let toggleAttendancePropCalled
    const toggleAttendanceProp = () => {
        toggleAttendancePropCalled = true
    }

    beforeEach(() => {
        toggleAttendancePropCalled = false
        wrapper = shallow(
            <UserAttending user={{}} toggleAttendance={toggleAttendanceProp} />
        )
    })

    it('should render an input', () => {
        expect(wrapper.find('input')).toHaveLength(1)
    })

    it('should toggle attending when clicked', () => {
        expect(toggleAttendancePropCalled).toBe(false)
        wrapper.find('input').simulate('change')
        expect(toggleAttendancePropCalled).toBe(true)
    })
})

describe('handleCheckboxChange', () => {
    const user = { id: 1 }
    let dispatchArgs
    const dispatch = (args) => { dispatchArgs = args }
    let toggleAttendanceDbCalled
    const fire = require('../../fire')

    fire.toggleAttendance = () => {
        toggleAttendanceDbCalled = true
    }

    beforeEach(() => {
        toggleAttendanceDbCalled = false
    })

    it('should dispatch an action to toggle attendance', () => {
        handleCheckboxChange(dispatch, user)
        expect(dispatchArgs).toEqual(toggleAttendance(1))
    })

    it('should toggle attendance on the DB', () => {
        handleCheckboxChange(dispatch, user)
        expect(toggleAttendanceDbCalled).toBe(true)
    })
})
