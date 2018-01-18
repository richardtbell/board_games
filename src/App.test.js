import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './App'
import Layout from './components/Layout/Layout';

configure({ adapter: new Adapter() })

describe('<App />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<App />)
    })

    it('should render <Layout />', () => {
        expect(wrapper.find(Layout)).toHaveLength(1)
    })

})


