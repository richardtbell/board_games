import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const activeClassName = 'nav-item-active'

export const StyledNavLink = styled(NavLink).attrs({
    activeClassName
}) `
    display: inline-block;
    padding: 20px;
    text-decoration: none;
    font-size: 32px;
    color: gray;
    float: ${props => props.align};

    &.${activeClassName} {
      text-decoration: underline;
      font-weight: bold; 
    }
`;
