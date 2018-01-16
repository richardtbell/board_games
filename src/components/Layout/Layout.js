import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import NavigationBar from '../NavigationBar/NavigationBar'
import firebase from 'firebase'

let redirect

class Layout extends Component {
    state = {
        signedIn: false
    }

    componentWillMount() {
        const that = this
        firebase.auth().onAuthStateChanged(function (user) {
            if (user !== undefined) {
                that.setState({ signedIn: true })
            } else {
                redirect = <Redirect to='/signin' />
            }
        });
    }

    render() {
        return (
            <div>
                {redirect}
                <NavigationBar signedIn={this.state.signedIn} />
                {this.props.children}
            </div>
        )
    }
}

export default Layout
