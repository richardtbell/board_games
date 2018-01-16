import React from 'react'

import { StyledNavLink } from '../UI'

const NavigationBar = (props) => {
    let profile = <StyledNavLink to="/signin" align='right'>Signin</StyledNavLink>
    if (props.signedIn) {
        profile = <StyledNavLink to="/profile" align='right'>Profile</StyledNavLink>
    }

    return (
        <header>
            <StyledNavLink to="/users">Users</StyledNavLink>
            <StyledNavLink to="/event">Event</StyledNavLink>
            <StyledNavLink to="/games">Games</StyledNavLink>
            {profile}
            <hr />
        </header>
    )
}

export default NavigationBar
