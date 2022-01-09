import axios from 'axios'

const login = ({ commit }, data) => {
    return new Promise(function (resolve, reject) {
        axios.post(`/api/token`, {
            username: data.username,
            password: data.password
        })
            .then(response => {
                commit('setToken', response.data)
                resolve('Bem vindo!')
            })
            .catch(error => {
                if (!error.response) {
                    reject('Tente novamente!')
                } else if (error.response.status === 400) {
                    reject('Campos inválidos!')
                } else if (error.response.status === 401) {
                    reject('Credências invádidas!')
                }
            })
    })
}

export {
    login
}