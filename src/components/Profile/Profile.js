import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

const Profile = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <label htmlFor='displayName'>Display Name</label>
                <Field name='displayName' component='input' type='text' />
            </div>
            <div>
                <label htmlFor='email'>Email</label>
                <Field name='email' component='input' type='email' />
            </div>
            <button type='submit'>Save Changes</button>
        </form>
    )
}

const profileForm = reduxForm({ form: 'profile', enableReinitialize: true })(Profile)

const getLoggedInUser = state => {
    const user = state.users.filter(user => user.uid === state.loggedInUser.uid)[0]
    return user ? user : {}
}

const mapStatetoProps = state => ({
    initialValues: getLoggedInUser(state)
})

export default connect(mapStatetoProps)(profileForm)


