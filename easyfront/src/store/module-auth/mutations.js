const setToken = (state, token) => {
    state.token = token.access
}

const setLogout = (state) => {
    state.token = false
}

const setSellerMutation = (state, data) => {
    state.user = data
}

const setSellerMetadataMutation = (state, data) => {
    state.metadata = data
}

const setSellerMetadataDinamicMutation = (state, { field, value }) => {
    if (field === 'mensagem1' || field === 'mensagem2') {
        Object.assign(state.metadata.config.boleto, { [field]: value })
    } else {
        Object.assign(state.metadata.config, { [field]: value })
    }
}

export {
    setToken,
    setLogout,
    setSellerMutation,
    setSellerMetadataMutation,
    setSellerMetadataDinamicMutation
}