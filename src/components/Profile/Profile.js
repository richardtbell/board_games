import React from 'react'
import { Field, reduxForm, FormSection, isPristine } from 'redux-form'
import { connect } from 'react-redux'

const Profile = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className='mb-3' >
            <div className='input-group mb-3'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>Display Name:</span>
                </div>
                <Field name='displayName' component='input' type='text' className='form-control' />
            </div>
            <div className='input-group mb-3'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>Email:</span>
                </div>
                <Field name='email' component='input' type='email' className='form-control' />
            </div>

            <FormSection name='games'>
                <p>Games Owned</p>
                <ul className='list-group mb-3' >
                    {props.games.map(game => {
                        return (
                            <li className='list-group-item' key={game.id}>
                                <Field name={game.id} component='input' type='checkbox' />
                                <label htmlFor={game.id}>{game.name}</label>
                            </li>
                        )
                    })}
                </ul>
            </FormSection>
            <button className='btn btn-primary' type='submit' disabled={props.pristine}>Save Changes</button>
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
    games: state.games,
    pristine: isPristine('profile')
})

export default connect(mapStatetoProps)(profileForm)


