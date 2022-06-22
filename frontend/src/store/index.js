import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router';

// A "store" is basically a container that holds your application state.
export default createStore({
  state: {
    isLogged: localStorage.getItem('token'),
  },

  getters: {

  },
  mutations: {

  },

  actions: {

  },

  modules: {
  }


})