import React, { Component } from 'react';
import { connect } from 'react-redux'
import Users from './components/Users'
import fire from './fire'

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
class App extends Component {
  state = {
    users: this.props.users,
    games: this.props.games
  }

  componentWillMount() {
    const usersRef = fire.database().ref('users').orderByKey().limitToLast(100);
    const gamesRef = fire.database().ref('games').orderByKey().limitToLast(100);
    const that = this
    usersRef.on('value', function(snapshot) {
      const snapValues = snapshot.val();
      const users = Object.keys(snapValues).map(id => {
        return {id: id, ...snapValues[id], games: []}
      })
      that.setState({users})
    });
    gamesRef.on('value', function(snapshot) {
      const snapValues = snapshot.val();
      if (snapValues) {
        const games = Object.keys(snapValues).map(id => {
          return {id: id, ...snapValues[id]}
        })
        that.setState({games})
      }
    });
  }

  render() {
    const numberOfPlayers = this.state.users.length
      return (
        <div className="App">
          <h1>Users</h1>
          <Users users={this.state.users}/>
          <Games games={this.state.games.filter(game => {
            return numberOfPlayers >= game.minPlayers && numberOfPlayers <= game.maxPlayers
          })}/>
        </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    games: state.games
  }
}

export default connect(mapStateToProps)(App);
