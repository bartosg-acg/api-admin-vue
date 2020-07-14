import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userToken: '',
    loggedIn: false,
    language: {
      id: 1,
      code: 'hu'
    }
  },
  mutations: {
    SET_USER_TOKEN: (state, token) => {
      state.userToken = token;
    },
    SET_LOGGED_IN: (state, value) => {
      state.loggedIn = value;
    }
  },
  actions: {
    setUserToken: (context, token) => {
      context.commit('SET_USER_TOKEN', token);
    },
    setLoggedIn: (context, value) => {
      context.commit('SET_LOGGED_IN', value);
    }
  },
  modules: {
  },
  getters: {

  }
})
