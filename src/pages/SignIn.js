import React, { Component } from 'react'
import firebase from 'firebase'
import { signIn } from '../actions/signIn'
import { connect } from 'react-redux'
import { saveUser } from '../db/fire'
import { getUserDetails } from '../utils'
import RegisterForm from '../components/RegisterForm/RegisterForm';
import SignInForm from '../components/SignInForm/SignInForm';

const provider = new firebase.auth.GoogleAuthProvider();

const handleSignInWithGoogle = (dispatch) => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        firebase.auth().signInWithPopup(provider).then(function (result) {
            const user = getUserDetails(result.user)
            saveUser(user).then(user => {
                dispatch(signIn(user))
            })
        }).catch(function (error) {
            console.log(error)
        });
    }).catch(function (error) {
        console.log(error)
    });
}

const handleRegister = (values, dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(values.email, values.password).then(result => {
        const newUser = { ...getUserDetails(result), displayName: values.displayName }
        saveUser(newUser).then(user => {
            dispatch(signIn(user))
        })
    }).catch(function (error) {
        console.log(error)
    });
}

const handleSignIn = (values, dispatch) => {
    firebase.auth().signInWithEmailAndPassword(values.email, values.password).then(result => {
        const newUser = { email: result.email, uid: result.uid }
        saveUser(newUser).then(user => {
            dispatch(signIn(user))
        })
    }).catch(function (error) {
        console.log(error)
    });
}

export class SignInPage extends Component {
    state = {
        createAccount: false
    }
    render() {
        let authForm = (
            <div>
                <SignInForm onSubmit={handleSignIn} />
                <button onClick={this.props.handleSignInWithGoogle}>Sign in with Google</button>
                <button onClick={() => this.setState({ createAccount: true })}>Create New Account</button>
            </div>
        )
        if (this.state.createAccount) {
            authForm = <RegisterForm onSubmit={handleRegister} />
        }
        return (
            <div>
                {authForm}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    handleSignInWithGoogle: () => { handleSignInWithGoogle(dispatch) }
})

export default connect(null, mapDispatchToProps)(SignInPage)