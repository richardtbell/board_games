import React from 'react'
import { connect } from 'react-redux'
import { addUser } from '../../actions/addUser'
import { saveUser } from '../../db/fire'

export const addNewUser = (dispatch, input) => {
    if (!input.value.trim()) {
        return
    }
    const user = { name: input.value, games: [], attending: false }
    saveUser(user).then(response => {
        user.id = response.key
        dispatch(addUser(user))
    })
    input.value = ''
}

export const AddNewUserForm = props => {
    let input
    return (
        <form onSubmit={e => {
            e.preventDefault()
            props.addNewUser(input)
        }}>
            <input ref={node => { input = node }} />
            <button type='submit'>Add user</button>
        </form>
    )

}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewUser: (input) => { addNewUser(dispatch, input) }
    }
}

export default connect(null, mapDispatchToProps)(AddNewUserForm)