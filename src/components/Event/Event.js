import React from 'react';
import { Games } from '../Games/Games'
import { flattenArray } from '../../utils'
import { connect } from 'react-redux'
import Users from '../Users/Users'

export const getPlayersAttending = (users) => {
    if (!users) {
        return []
    }
    return users.filter(user => user.attending)
}

const getUserGames = (allGames, ownGames) => {
    if (allGames === ownGames) {
        return allGames
    }
    if (ownGames) {
        return flattenArray(ownGames.map((gameId) => {
            return allGames.filter(game => game.id === gameId)
        }))
    }
    return []
}

export const getPlayersGames = (state) => {
    if (!state || !state.users) {
        return []
    }
    const games = state.users.map(user => {
        return user.attending && user.games ? Object.keys(user.games) : []
    })
    return getUserGames(state.games, flattenArray(games))
}

export const Event = props => {
    const playersList = props.players.map(player => {
        return <div key={player.id}>{player.name}</div>
    })

    const getSuitableGames = () => {
        return props.games.filter(game => {
            return props.players.length >= game.minPlayers && props.players.length <= game.maxPlayers
        })
    }

    return (
        <div>
            <h1>Event</h1>
            <h2>Players invited</h2>
            <Users users={props.users} />
            <h2>Players Attending</h2>
            {playersList}
            <h2>Suitable Games</h2>
            <Games games={getSuitableGames()} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        players: getPlayersAttending(state.users),
        games: getPlayersGames(state),
        users: state.users
    }
}

export default connect(mapStateToProps)(Event);