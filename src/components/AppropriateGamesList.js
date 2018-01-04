import React from 'react';
import Games from './Games'

const AppropriateGamesList = props => {
    return (
        <div>
            <h1>Board Games Available</h1>
            <Games games={props.games.filter(game => {
                return props.numberOfPlayers >= game.minPlayers && props.numberOfPlayers <= game.maxPlayers
            })} />
        </div>
    )
}

export default AppropriateGamesList