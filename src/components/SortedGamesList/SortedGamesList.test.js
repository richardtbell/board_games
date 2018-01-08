import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { SortedGamesList } from './SortedGamesList'

configure({ adapter: new Adapter() })

function expectGamesPropsToHaveOrder(wrapper, orderedArray) {
    const gamesProps = wrapper.find('Games').props().games;
    expect(gamesProps).toEqual(orderedArray)
}

describe('<SortedGamesList />', () => {
    let wrapper;
    const twoPlayerGame = { name: 'Two player game', minPlayers: 2, maxPlayers: 2 }
    const twoToFourPlayerGame = { name: 'Two to Four player game', minPlayers: 2, maxPlayers: 4 }
    const anotherTwoToFourPlayerGame = { name: 'Another two to four player game', minPlayers: 2, maxPlayers: 4 }
    const threePlayerGame = { name: 'Three player game', minPlayers: 3, maxPlayers: 3 }

    beforeEach(() => {
        wrapper = shallow(
            <SortedGamesList games={[]} />
        )
    })

    it('should render <Games />', () => {
        expect(wrapper.find('Games')).toHaveLength(1)
    })

    it('should order games by minPlayers first', () => {
        wrapper.setProps({ games: [threePlayerGame, twoPlayerGame] })
        expectGamesPropsToHaveOrder(wrapper, [twoPlayerGame, threePlayerGame]);
    })

    it('should order by minPlayers then maxPlayers', () => {
        wrapper.setProps({ games: [twoToFourPlayerGame, threePlayerGame, twoPlayerGame] })
        expectGamesPropsToHaveOrder(wrapper, [twoPlayerGame, twoToFourPlayerGame, threePlayerGame]);
    })

    it('should order by alphabetically when minPlayers and maxPlayers are the same', () => {
        wrapper.setProps({
            games: [
                twoToFourPlayerGame, threePlayerGame, anotherTwoToFourPlayerGame, twoPlayerGame]
        })
        expectGamesPropsToHaveOrder(wrapper, [
            twoPlayerGame, anotherTwoToFourPlayerGame, twoToFourPlayerGame, threePlayerGame]);
    })

})
