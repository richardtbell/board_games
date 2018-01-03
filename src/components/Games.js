import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addGameForUser } from '../actions/addGame'

const addNewGame = (dispatch, userId, game) => {
    if (!game.name.trim()) {
        return
    }
    dispatch(addGameForUser({userId, game}))
}
class Games extends Component {
    initialState = {
        name: '',
        minPlayers: '',
        maxPlayers: ''
    }
    state = this.initialState

    updateNameInputElement = (value) => {
        this.setState({name: value})
    }
    updateMinPlayersInputElement = (value) => {
        this.setState({minPlayers: value})
    }
    updateMaxPlayersInputElement = (value) => {
        this.setState({maxPlayers: value})
    }

    componentDidMount() {
        this.nameInput.focus()
    }

    render() {
        const gamesList = this.props.games.map((game, index) => <li key={index}>{game.name}</li>)
        return (
            <ul>
                {gamesList}
                <form onSubmit={e => { 
                    e.preventDefault() 
                    this.props.addNewGame(this.props.userId, this.state)
                    this.setState(this.initialState)
                    this.nameInput.focus()
                }}>
                    <label>
                        Game Name:
                        <input ref={node => this.nameInput = node} onChange={e => {this.updateNameInputElement(e.target.value)}} value={this.state.name}/>
                    </label>
                    <label>
                        Min Players:
                        <input onChange={e => {this.updateMinPlayersInputElement(e.target.value)}} value={this.state.minPlayers}/>
                    </label>
                    <label>
                        Max Players:
                        <input onChange={e => {this.updateMaxPlayersInputElement(e.target.value)}} value={this.state.maxPlayers}/>
                    </label>
                    <button type='submit'>Add Game</button>
                </form>
            </ul>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNewGame: (userId, game) => {addNewGame(dispatch, userId, game)}
    }
}

export default connect(null, mapDispatchToProps)(Games)