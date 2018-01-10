import React from 'react'
// import fire from '../fire'
// import firebase from 'firebase'
// import { signIn } from '../actions/signIn'
// import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// import { saveUser } from '../fire'

const Profile = (props) => {
    const fields = Object.keys(props.user).map(field => {
        return (
            <label key={field}>
                {field}
                <input value={props.user[field]} />
            </label>
        )
    })
    return (
        <form>
            {fields}
        </form>
    )
}

const mapStatetoProps = state => ({
    user: state.loggedInUser
})

export default connect(mapStatetoProps)(Profile)