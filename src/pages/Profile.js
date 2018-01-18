import React from 'react'
import { connect } from 'react-redux'
import AddNewGameForm from '../components/AddNewGameForm/AddNewGameForm'
import ProfileForm from '../components/Profile/Profile'
import { updateUser } from '../actions/updateUser'
import { saveUser } from '../db/fire'

export const Profile = (props) => {
    const handleSubmit = (values, dispatch) => {
        saveUser(values)
        dispatch(updateUser(values))
    }

    return (
        <div className='container' >
            <div className='col-sm-6' >
                <ProfileForm onSubmit={handleSubmit} />
                <h2>Add new Game</h2>
                <AddNewGameForm userId={props.user.id} />
            </div>
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