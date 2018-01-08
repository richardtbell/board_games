import React from 'react'

import { StyledNavLink } from '../UI'

const NavigationBar = (props) => {
    return (
        <header>
            <StyledNavLink to="/users">Users</StyledNavLink>
            <StyledNavLink to="/event">Event</StyledNavLink>
            <StyledNavLink to="/games">Games</StyledNavLink>
        </header>
    )
}

export default NavigationBar
