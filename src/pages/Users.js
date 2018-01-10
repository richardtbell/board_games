import React from 'react'
import AddNewUserForm from '../components/AddNewUserForm/AddNewUserForm'
import Users from '../components/Users/Users'

const UsersPage = (props) => {
    return (
        <div>
            <h1>Users</h1>
            <Users />
            <h2>Add user:</h2>
            <AddNewUserForm />
        </div>
    )
}
export default UsersPage