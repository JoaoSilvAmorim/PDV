import decode from 'jwt-decode'

function loggedIn (state) {
    const token = state.token
    if (token) {
        const decoded = decode(token)
        if (Math.round(+new Date()/1000) < decoded.exp) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

function getToken (state) {
    return state.token
}

function getSeller (state) {
    return state.user
}

function getSellerMetadata (state) {
    return state.metadata
}

function getProfile (state, getters) {
    return decode(getters.getToken)
}

export {
    getSellerMetadata,
    loggedIn,
    getToken,
    getSeller,
    getProfile
}
