import React from 'react'
import firebase from 'firebase'
import { signOut } from '../actions/signOut'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

export const SignOutPage = (props) => {
    firebase.auth().signOut().then(function () {
        props.dispatch(signOut())
    }, function (error) {
        console.error('Sign Out Error', error);
    });
    return (
        <Redirect to='/signin' />
    )
}

const mapDispatchToProps = dispatch => ({
    dispatch
})

export default connect(null, mapDispatchToProps)(SignOutPage)