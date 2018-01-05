import React from 'react'
import Games from '../Games/Games'
import AddNewGameForm from '../AddNewGameForm/AddNewGameForm'
import AddNewUserForm from '../AddNewUserForm/AddNewUserForm'

// Don't like the use of Object.values here to turn it into an array
function Users(props) {
    const userList = props.users.map((user, index) => {
        return (
            <li key={index}>
                <h3>{user.name}</h3>
                <Games games={Object.values(user.games)} />
                <AddNewGameForm userId={user.id} />
            </li>
        )
    })

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

export default Users