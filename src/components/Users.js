import React from 'react'
import { connect } from 'react-redux'
import { addUser } from '../actions/addUser'
import Games from './Games'

let input
const addNewUser = dispatch => {
    if (!input.value.trim()) {
        return
    }
    dispatch(addUser({name: input.value, games:[]}))
    input.value = ''
}

function Users(props) {
    const userList = props.users.map((user, index) => {
        return (
            <li key={index}>
                <h3>{user.name}</h3>
                <Games games={user.games} userId={user.id}/>
            </li>
        )
    })
    
    return (
        <div>
            <ul>
                {userList}
            </ul>
            <form onSubmit={e => { 
                e.preventDefault() 
                props.addNewUser()
            }}>
                <label>User</label>
                <input ref={node => {input = node}}/>
                <button type='submit'>Add user</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
      addNewUser: () => {addNewUser(dispatch)}
    }
  }

export default connect(null, mapDispatchToProps)(Users)