import React from 'react';
import NavigationBar from '../NavigationBar/NavigationBar'
import { connect } from 'react-redux';

const Layout = props => {
    return (
        <div>
            <NavigationBar signedIn={props.signedIn} />
            {props.children}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    console.log('state', state)

    return {
        signedIn: !!state.loggedInUser.uid,
        ...ownProps
    }
}

export default connect(mapStateToProps)(Layout)
