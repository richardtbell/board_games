import React from 'react'
import { toggleAttendance } from '../../actions/toggleAttendance'
import { connect } from 'react-redux'
import { toggleAttendance as toggleDbAttendance } from '../../fire'

function UserAttending(props) {
    return (
        <label>
            User Attending
            <input type="checkbox" onChange={() => props.toggleAttendance(props.user)} checked={props.user.attending} />
        </label>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        toggleAttendance: (user) => {
            toggleDbAttendance(user)
            dispatch(toggleAttendance(user.id))
        }
    }
}

export default connect(null, mapDispatchToProps)(UserAttending)