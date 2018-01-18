export const getUserDetails = ({ displayName, email, uid }) => {
    return { displayName: displayName || email, email, uid }
}