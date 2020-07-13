import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userToken: '',
    language: {
      id: 1,
      code: 'hu'
    }
  },
  mutations: {
    SET_USER_TOKEN: (state, token) => {
      state.userToken = token;
    }
  },
  actions: {
    setUserToken: (context, token) => {
      context.commit('SET_USER_TOKEN', token);
    }
  },
  modules: {
  },
  getters: {

  }
})
