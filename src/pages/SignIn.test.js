import { SignInPage } from './SignIn'
import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'


configure({ adapter: new Adapter() })

describe('<SignInPage />', () => {
    let wrapper;
    let handleSignInCalled

    beforeEach(() => {
        handleSignInCalled = false
        wrapper = shallow(<SignInPage handleSignIn={() => handleSignInCalled = true} />)
    })

    it('should render a sign in with google button', () => {
        expect(wrapper.find('button')).toHaveLength(1)
    })

    it('should call handleSignIn when the button is clicked', () => {
        expect(handleSignInCalled).toBe(false)
        wrapper.find('button').simulate('click')
        expect(handleSignInCalled).toBe(true)
    })
})