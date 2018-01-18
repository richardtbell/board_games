import React from 'react'
import { Field, reduxForm } from 'redux-form'

const Register = (props) => {
    return (
        <div>

            <h2>Register</h2>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <Field name='email' component='input' type='email' />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <Field name='password' component='input' type='password' />
                </div>
                <button type='submit' disabled={props.pristine}>Create New Account</button>
            </form>
        </div>
    )
}

const registerForm = reduxForm({ form: 'register', enableReinitialize: true })(Register)

export default registerForm


