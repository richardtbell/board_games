import React from 'react'

import { StyledNavLink } from '../UI'

const NavigationBar = (props) => {
    let profile = <StyledNavLink to="/signin" align='right'>Sign In</StyledNavLink>
    if (props.signedIn) {
        profile = (
            <span>
                <StyledNavLink to="/signout" align='right'>Sign Out</StyledNavLink>
                <StyledNavLink to="/profile" align='right'>Profile</StyledNavLink>
            </span>
        )
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
