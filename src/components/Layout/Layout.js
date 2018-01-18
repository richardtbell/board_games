import React, { Component } from 'react';
import NavigationBar from '../NavigationBar/NavigationBar'
import firebase from 'firebase'

class Layout extends Component {
    state = {
        signedIn: false
    }

    componentWillMount() {
        const that = this
        firebase.auth().onAuthStateChanged(function (user) {
            if (user !== null) {
                that.setState({ signedIn: true })
            }
        });
    }

    render() {
        return (
            <div>
                <NavigationBar signedIn={this.state.signedIn} />
                {this.props.children}
            </div>
        )
    }
}

export default Layout
