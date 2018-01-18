import React from 'react'
import { toggleAttendance } from '../../actions/toggleAttendance'
import { connect } from 'react-redux'
import { toggleAttendance as toggleDbAttendance } from '../../db/fire'
import styled from 'styled-components'

export const handleCheckboxChange = (dispatch, user) => {
    toggleDbAttendance(user)
    dispatch(toggleAttendance(user.id))
}

const Label = styled.label`
    padding: 20px;
`

export const UserAttending = (props) => {
    return (
        <Label>
            <input
                type="checkbox"
                onChange={() => props.toggleAttendance(props.user)}
                checked={props.user.attending}
            />
            Attending?
        </Label>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        toggleAttendance: (user) => {
            handleCheckboxChange(dispatch, user)
        }
    }
}

export default connect(null, mapDispatchToProps)(UserAttending)