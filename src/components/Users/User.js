import React, { Component } from 'react'
import AddNewGameForm from '../AddNewGameForm/AddNewGameForm'
import UserAttending from '../UserAttending/UserAttending'
import Games from '../Games/Games'

export default class User extends Component {
    state = {
        showGames: false
    }

    handleButtonClick = () => {
        this.setState({ showGames: true })
    }

    renderGames() {
        if (this.state.showGames) {
            return (
                <div>
                    <Games games={this.props.user.games} />
                </div>
            )
        } else {
            return <button onClick={this.handleButtonClick}>Show Games</button>
        }
    }

    render() {
        return (
            <li>
                <span>{this.props.user.displayName}</span>
                {/* <UserAttending user={this.props.user} /> */}
                {this.renderGames()}
            </li>
        )

    }
}