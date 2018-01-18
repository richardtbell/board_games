import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addGameForUser } from '../../actions/addGame'
import { addGame, addGameToUser } from '../../db/fire'

export const addNewGame = (dispatch, userId, game) => {
    if (!game.name.trim()) {
        return
    }
    addGame(game).then(response => {
        const savedGame = { ...game, id: response.key }
        dispatch(addGameForUser({ userId, game: savedGame }))
        addGameToUser(userId, savedGame)
    })
}

export class AddNewGameForm extends Component {
    initialState = {
        name: '',
        minPlayers: '',
        maxPlayers: ''
    }
    state = this.initialState

    updateNameInputElement = (value) => {
        this.setState({ name: value })
    }
    updateMinPlayersInputElement = (value) => {
        this.setState({ minPlayers: value })
    }
    updateMaxPlayersInputElement = (value) => {
        this.setState({ maxPlayers: value })
    }

    isDisabled = () => {
        const fields = Object.keys(this.state)
        return fields.some(el => {
            return this.state[el].length === 0
        })
    }

    render() {
        return (
            <form onSubmit={e => {
                e.preventDefault()
                this.props.addNewGame(this.props.userId, this.state)
                this.setState(this.initialState)
                this.nameInput.focus()
            }}>
                <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text'>Game Name:</span>
                    </div>
                    <input
                        className='form-control'
                        type='text'
                        ref={node => this.nameInput = node}
                        onChange={e => { this.updateNameInputElement(e.target.value) }}
                        value={this.state.name}
                    />
                </div>
                <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text'>Min Players:</span>
                    </div>
                    <input
                        className='form-control'
                        type='text'
                        onChange={e => { this.updateMinPlayersInputElement(e.target.value) }}
                        value={this.state.minPlayers}
                    />
                </div>
                <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text'>Max Players:</span>
                    </div>
                    <input
                        className='form-control'
                        type='text'
                        onChange={e => { this.updateMaxPlayersInputElement(e.target.value) }}
                        value={this.state.maxPlayers}
                    />
                </div>
                <button className='btn btn-success' type='submit' disabled={this.isDisabled()}>Add Game</button>
            </form>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNewGame: (userId, game) => { addNewGame(dispatch, userId, game) }
    }
}

export default connect(null, mapDispatchToProps)(AddNewGameForm)