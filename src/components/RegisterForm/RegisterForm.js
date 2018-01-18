import React from 'react'
import { Field, reduxForm } from 'redux-form'

const Register = (props) => {
    return (
        <div className='col-sm-6 col-sm-offset-3'>
            <h2>Register</h2>
            <form onSubmit={props.handleSubmit}>
                <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text'>Email:</span>
                    </div>
                    <Field name='email' component='input' type='email' className='form-control' />
                </div>
                <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text'>Password:</span>
                    </div>
                    <Field name='password' component='input' type='password' className='form-control' />
                </div>
                <button className='btn btn-primary' type='submit' disabled={props.pristine}>Create New Account</button>
            </form>
        </div>
    )
}

const registerForm = reduxForm({ form: 'register', enableReinitialize: true })(Register)

export default registerForm


