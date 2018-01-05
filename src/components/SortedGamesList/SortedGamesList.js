import React from 'react';
import Games from '../Games/Games'

const SortedGamesList = props => {
    return (
        <div>
            <h1>All Games</h1>
            <Games games={props.games.sort((a, b) => {
                const alphabeticalSort = a.name < b.name ? -1 : a.name > b.name ? 1 : 0
                return (a.minPlayers - b.minPlayers) || (a.maxPlayers - b.maxPlayers) || alphabeticalSort
            })} />
        </div>
    )
}

export default SortedGamesList