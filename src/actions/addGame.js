export const ADD_GAME_FOR_USER = 'ADD_GAME_FOR_USER'

export const addGameForUser = ({ game, userId }) => ({
    type: ADD_GAME_FOR_USER,
    game, userId
})
