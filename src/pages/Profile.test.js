import { Profile } from './Profile'
import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ProfileForm from '../components/Profile/Profile'
import AddNewGameForm from '../components/AddNewGameForm/AddNewGameForm'


configure({ adapter: new Adapter() })

describe('<Profile />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Profile user={{ name: 'bob' }} />)
    })

    it('should render a <ProfileForm/>', () => {
        expect(wrapper.find(ProfileForm)).toHaveLength(1)
    })

    it('should render a <AddNewGameForm/>', () => {
        expect(wrapper.find(AddNewGameForm)).toHaveLength(1)
    })
})