import React from 'react'

const Games = props => {
    const gamesList = props.games.map(game => <li key={game.name} >{game.name}: {game.minPlayers}-{game.maxPlayers} players</li>)
    return (
        <div>
            <ul>
                {gamesList}
            </ul>
        </div>
    )
}

export default Games