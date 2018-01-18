import React from 'react'
import { Field, reduxForm } from 'redux-form'

const SignIn = (props) => {
    return (
        <div>

            <h2>Sign In</h2>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <Field name='email' component='input' type='email' />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <Field name='password' component='input' type='password' />
                </div>
                <button type='submit' disabled={props.pristine}>Sign In</button>
            </form>
        </div>
    )
}

const signInForm = reduxForm({ form: 'signin' })(SignIn)

export default signInForm


