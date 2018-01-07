import React from 'react';
import { connect } from 'react-redux'
import Users from './components/Users/Users'
import Event from './components/Event/Event'
import SortedGamesList from './components/SortedGamesList/SortedGamesList'

export const App = props => {
  const getPlayersAttending = () => {
    return props.users.filter(user => user.attending)
  }

  const flattenArray = (array) => {
    return [].concat.apply([], array)
  }

  const getPlayersGames = () => {
    const games = props.users.map(user => user.attending ? Object.values(user.games) : [])
    return flattenArray(games)
  }

  return (
    <div className="App">
      <Users users={props.users} />
      <SortedGamesList games={props.games} />
      <Event players={getPlayersAttending()} games={getPlayersGames()} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    games: state.games
  }
}

export default connect(mapStateToProps)(App);
