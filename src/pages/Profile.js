import React from 'react'
import { connect } from 'react-redux'
import AddNewGameForm from '../components/AddNewGameForm/AddNewGameForm'
import Games from '../components/Games/Games'
import { Redirect } from 'react-router-dom'

const Profile = (props) => {
    let redirect
    if (!props.user.uid) {
        redirect = <Redirect to='/signin' />
    }
    return (
        <div>
            <form>
                {redirect}
                <label>
                    Display Name
                    <input value={props.user.displayName} />
                </label>
                <label>
                    Email
                    <input value={props.user.email} />
                </label>
            </form>
            <h2>Games</h2>
            <Games games={props.user.games ? Object.values(props.user.games) : []} />
            <AddNewGameForm userId={props.user.id} />
        </div>
    )
}

const getLoggedInUser = state => {
    const user = state.users.filter(user => user.uid === state.loggedInUser.uid)[0]
    return user ? user : {}
}

const mapStatetoProps = state => ({
    user: getLoggedInUser(state)
})

export default connect(mapStatetoProps)(Profile)