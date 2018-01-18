export const getUserNameFromEmail = email => {
    return email.split('@')[0]
}

export const getUserDetails = ({ displayName, email, uid }) => {
    return { displayName: displayName || getUserNameFromEmail(email), email, uid }
}