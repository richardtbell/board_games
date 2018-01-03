import React, { Component } from 'react';
import { connect } from 'react-redux'
import Users from './components/Users'

// User login
// Add board games
// Host event
// Invite users
// Users accept invite
// Suggest games based on number of players
// Add group
// Join group
// Voting
// Split group
// Track games played

const Games = props => {
  const gamesList = props.games.map(game => <li key={game.name} >{game.name}: {game.minPlayers}-{game.maxPlayers}</li>)
  return (
    <div>
        <h1>Board Games Available</h1>
        <ul>
          {gamesList}
        </ul>
    </div>
  )
}

const App = props => {
  const numberOfPlayers = props.users.length
    return (
      <div className="App">
        <h1>Users</h1>
        <Users users={props.users}/>
        <Games games={props.games.filter(game => {
          return numberOfPlayers >= game.minPlayers && numberOfPlayers <= game.maxPlayers
        })}/>
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
