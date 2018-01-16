import React from 'react'
import { connect } from 'react-redux'
import { flattenArray } from '../../utils'

export const Games = props => {
    const gamesList = props.games.map(game => <li key={game.name} >{game.name}: {game.minPlayers}-{game.maxPlayers} players</li>)
    return (
        <div>
            <ul>
                {gamesList}
            </ul>
        </div>
    )
}

const getUserGames = (allGames, ownGames) => {
    if (allGames === ownGames) {
        return allGames
    }
    if (ownGames) {
        return flattenArray(Object.keys(ownGames).map((gameId) => {
            return allGames.filter(game => game.id === gameId)
        }))
    }
    return []
}

const mapStateToProps = (state, ownProps) => {
    return {
        games: getUserGames(state.games, ownProps.games)
    }
}

export default connect(mapStateToProps)(Games)