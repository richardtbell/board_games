import React from 'react'
import { connect } from 'react-redux'
import { addUser } from '../actions/addUser'
import fire from '../fire'

let input
const addNewUser = dispatch => {
    if (!input.value.trim()) {
        return
    }
    const user = {name: input.value, games:[]}
    fire.database().ref('users').push( user );
    dispatch(addUser(user))
    input.value = ''
}

const AddNewUserForm = props => {
    return (
        <form onSubmit={e => {
            e.preventDefault()
            props.addNewUser()
        }}>
            <label>User</label>
            <input ref={node => { input = node }} />
            <button type='submit'>Add user</button>
        </form>
    )

}

const mapDispatchToProps = (dispatch) => {
    return {
      addNewUser: () => {addNewUser(dispatch)}
    }
  }

export default connect(null, mapDispatchToProps)(AddNewUserForm)