import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import auth from './module-auth' 

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogged(state, getters) {
			return state.logged
		},
  },
  mutations: {
    setLogin(state, payload) {
			state.logged = true
		},
		setLogout(state, payload) {
			state.layout.navPos = null
			state.layout.toolbar = null
			state.logged = false
		},
  },
  actions: {
  },
  modules: {
    auth
  },

  plugins: [
		createPersistedState({paths: ['auth']},
		)]
})
