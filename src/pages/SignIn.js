import React from 'react'
// import fire from '../fire'
import firebase from 'firebase'
import { signIn } from '../actions/signIn'
import { connect } from 'react-redux'
import { saveUser } from '../fire'
import { getUserDetails } from '../utils'

const provider = new firebase.auth.GoogleAuthProvider();



const handleSignIn = (dispatch) => {
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