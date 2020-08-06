import Vue from 'vue'
import Vuex from 'vuex'
import * as CONFIG from '@/setup/init.js';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userToken: undefined,
    loggedIn: false,
    language: {
      id: CONFIG.defaultLanguageId,
      code: CONFIG.defaultLanguageCode
    },
    apiCalls: {}
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
