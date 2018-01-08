import React from 'react'
import Games from '../Games/Games'
import AddNewGameForm from '../AddNewGameForm/AddNewGameForm'
import AddNewUserForm from '../AddNewUserForm/AddNewUserForm'
import UserAttending from '../UserAttending/UserAttending'
import { Title } from '../UI'
import { connect } from 'react-redux'

export const Users = (props) => {
    const userList = props.users.map((user, index) => {
        return (
            <li key={index}>
                <h3>{user.name}</h3>
                <UserAttending user={user} />
                <Games games={Object.values(user.games)} />
                <AddNewGameForm userId={user.id} />
            </li>
        )
    })

    return (
        <div>
            <Title>Users</Title>
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