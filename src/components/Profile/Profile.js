import React from 'react'
import { Field, reduxForm, FormSection } from 'redux-form'
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
            <FormSection name='games'>
                <p>Games Owned</p>
                <ul>
                    {props.games.map(game => {
                        return (
                            <li key={game.id}>
                                <label htmlFor={game.id}>{game.name}</label>
                                <Field name={game.id} component='input' type='checkbox' />
                            </li>
                        )
                    })}
                </ul>
            </FormSection>
            <button type='submit'>Save Changes</button>
        </form>
    )
}

const profileForm = reduxForm({ form: 'profile', enableReinitialize: true })(Profile)

const getLoggedInUser = state => {
    const user = state.users.filter(user => user.uid === state.loggedInUser.uid)[0]
    return { ...user }
}

const mapStatetoProps = state => ({
    initialValues: getLoggedInUser(state),
    games: state.games
})

export default connect(mapStatetoProps)(profileForm)


