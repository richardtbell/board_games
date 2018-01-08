import React from 'react'
import AddNewUserForm from '../AddNewUserForm/AddNewUserForm'
import { connect } from 'react-redux'
import User from './User'

export const Users = (props) => {
    const userList = props.users.map((user) => <User key={user.id} user={user} />)

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {userList}
            </ul>
            <AddNewUserForm />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
    }
}

export default connect(mapStateToProps)(Users);