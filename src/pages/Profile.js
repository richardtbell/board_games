import React from 'react'
import { connect } from 'react-redux'
import AddNewGameForm from '../components/AddNewGameForm/AddNewGameForm'
import { Redirect } from 'react-router-dom'
import ProfileForm from '../components/Profile/Profile'
import { updateUser } from '../actions/updateUser'
import { saveUser } from '../db/fire'

const Profile = (props) => {
    let redirect
    if (!props.user.uid) {
        redirect = <Redirect to='/signin' />
    }

    const handleSubmit = (values, dispatch) => {
        saveUser(values)
        dispatch(updateUser(values))
    }

    return (
        <div>
            {redirect}
            <ProfileForm onSubmit={handleSubmit} />
            <h2>Add new Game</h2>
            <AddNewGameForm userId={props.user.id} />
        </div>
    )
}

const getLoggedInUser = state => {
    const user = state.users.filter(user => user.uid === state.loggedInUser.uid)[0]
    return user ? user : {}
}

const mapStatetoProps = state => ({
    user: getLoggedInUser(state)
})

export default connect(mapStatetoProps)(Profile)