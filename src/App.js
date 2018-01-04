import React, { Component } from 'react';
import { connect } from 'react-redux'
import Users from './components/Users'
import fire from './fire'
import { addDataFromFirebase } from './actions/addDataFromFirebase'
import Games from './components/Games'

// Big goals
// User login
// Host event
// Invite users
// Users accept invite
// Add group
// Join group
// Voting
// Split group
// Track games played

// TODO
// reference games array instead of storing games twice
// Loading state
// Add tests
// Add styles
// Option to choose game from list as well as add details
// Add functionality to add a group and have the available board games based from the number of players

const App = props => {
  const numberOfPlayers = props.users.length
  return (
    <div className="App">
      <h1>Users</h1>
      <Users users={props.users} />
      <h1>All Games</h1>
      <Games games={props.games.sort((a, b) => {
        const alphabeticalSort = a.name < b.name ? -1 : a.name > b.name ? 1 : 0
        return (a.minPlayers - b.minPlayers) || (a.maxPlayers - b.maxPlayers) || alphabeticalSort
      })} />
      <h1>Board Games Available</h1>
      <Games games={props.games.filter(game => {
        return numberOfPlayers >= game.minPlayers && numberOfPlayers <= game.maxPlayers
      })} />
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
