import React from 'react'
import { connect } from 'react-redux'
import User from './User'

export const Users = (props) => {
    const userList = props.users.map((user) => <User key={user.id} user={user} />)

    return (
        <div>
            <ul>
                {userList}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
    }
}

export default connect(mapStateToProps)(Users);