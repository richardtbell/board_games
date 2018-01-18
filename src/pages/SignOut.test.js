import { SignOutPage } from './SignOut'
import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('<SignOutPage />', () => {
    let wrapper;
    let signOutCalled
    let dispatchCalled
    const mockFire = require('firebase')
    mockFire.auth = () => {
        return {
            signOut: () => {
                signOutCalled = true
                return {
                    then: callback => {
                        callback()
                    }
                }
            }
        }
    }

    beforeEach(() => {
        signOutCalled = false
        dispatchCalled = false
        wrapper = shallow(<SignOutPage dispatch={() => dispatchCalled = true} />)
    })

    it('should call sign out', () => {
        expect(signOutCalled).toBe(true)
    })

    it('should dispatch an action', () => {
        expect(dispatchCalled).toBe(true)
    })

    it('should redirect to signin', () => {
        expect(wrapper.find('Redirect')).toHaveLength(1)
        expect(wrapper.find('Redirect').props().to).toEqual('/signin')
    })
})