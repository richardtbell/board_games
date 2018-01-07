import React from 'react';
import Games from '../Games/Games'

const Event = props => {
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

export default Event