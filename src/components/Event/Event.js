import React from 'react';
import Games from '../Games/Games'
import { flattenArray } from '../../utils'
import { connect } from 'react-redux'

export const getPlayersAttending = (users) => {
    if (!users) {
        return []
    }
    return users.filter(user => user.attending)
}

export const getPlayersGames = (users) => {
    if (!users) {
        return []
    }
    const games = users.map(user => user.attending ? Object.values(user.games) : [])
    return flattenArray(games)
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
        games: getPlayersGames(state.users)
    }
}

export default connect(mapStateToProps)(Event);