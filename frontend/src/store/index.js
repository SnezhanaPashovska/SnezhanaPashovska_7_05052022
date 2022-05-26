import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router';

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