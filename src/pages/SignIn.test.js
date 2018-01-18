import { SignInPage } from './SignIn'
import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SignInForm from '../components/SignInForm/SignInForm';


configure({ adapter: new Adapter() })

describe('<SignInPage />', () => {
    let wrapper;
    let handleSignInCalled

    beforeEach(() => {
        handleSignInCalled = false
        wrapper = shallow(<SignInPage handleSignInWithGoogle={() => handleSignInCalled = true} />)
    })

    it('should render a sign in form', () => {
        expect(wrapper.find(SignInForm)).toHaveLength(1)
    })

    it('should call handleSignIn when the sign in with google button is clicked', () => {
        expect(handleSignInCalled).toBe(false)
        expect(wrapper.find('button#googleSSO')).toHaveLength(1)
        wrapper.find('button#googleSSO').simulate('click')
        expect(handleSignInCalled).toBe(true)
    })
})