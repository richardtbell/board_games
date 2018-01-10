import React from 'react'
// import fire from '../fire'
import firebase from 'firebase'
import { signIn } from '../actions/signIn'
import { connect } from 'react-redux'
import { saveUser } from '../fire'

const provider = new firebase.auth.GoogleAuthProvider();

const handleSignIn = (dispatch) => {
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // ...
        // The signed-in user info.
        var user = (({ displayName, email, uid }) => ({ displayName, email, uid }))(result.user);
        dispatch(signIn(user))
        saveUser(user)
    }).catch(function (error) {
        console.log(error)
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // // The email of the user's account used.
        // var email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // ...
    });
}

const SignInPage = (props) => {
    return (
        <div>
            <button onClick={props.handleSignIn}>Sign in with Google</button>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    handleSignIn: () => { handleSignIn(dispatch) }
})

export default connect(null, mapDispatchToProps)(SignInPage)