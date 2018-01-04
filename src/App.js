import React, { Component } from 'react';
import { connect } from 'react-redux'
import Users from './components/Users'
import fire from './fire'
import { addDataFromFirebase } from './actions/addDataFromFirebase'

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
    games: this.props.games,
    usersLoading: true,
    gamesLoading: true
  }

  componentDidMount() {
    const usersRef = fire.database().ref('users').orderByKey().limitToLast(100);
    const gamesRef = fire.database().ref('games').orderByKey().limitToLast(100);
    const that = this
    usersRef.once('value', function(snapshot) {
      const snapValues = snapshot.val();
      if (snapValues) {
        const users = Object.keys(snapValues).map(id => {
          return {id: id, games: [], ...snapValues[id]}
        })
        that.setState({users})
        that.props.addData({users})
        that.setState({usersLoading: false})
      }
    });
    gamesRef.once('value', function(snapshot) {
      const snapValues = snapshot.val();
      if (snapValues) {
        const games = Object.keys(snapValues).map(id => {
          return {id: id, ...snapValues[id]}
        })
        that.setState({games})
        that.props.addData({games})
        that.setState({gamesLoading: false})
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({users: nextProps.users, games: nextProps.games})
  }

  render() {
    const numberOfPlayers = this.state.users.length
    const usersLoadingState = this.state.usersLoading ? <p>Users Loading...</p> : null
    const gamesLoadingState = this.state.gamesLoading ? <p>Games Loading...</p> : null
      return (
        <div className="App">
          <h1>Users</h1>
          {usersLoadingState}
          <Users users={this.state.users}/>
          {gamesLoadingState}
          <Games games={this.state.games.filter(game => {
            return numberOfPlayers >= game.minPlayers && numberOfPlayers <= game.maxPlayers
          })}/>
        </div>
      );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addData: data => dispatch(addDataFromFirebase(data))
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    games: state.games
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
