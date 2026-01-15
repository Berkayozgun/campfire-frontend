import Vue from 'vue';
import Vuex from 'vuex';
import apiService from '@/services/api';

Vue.use(Vuex);

// Initial state from localStorage
const storedUser = JSON.parse(localStorage.getItem('user'));

export default new Vuex.Store({
  state: {
    user: storedUser || null,
    isDarkMode: localStorage.getItem('theme') === 'dark'
  },
  mutations: {
    SET_USER(state, userData) {
      state.user = userData;
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        localStorage.removeItem('user');
      }
    },
    TOGGLE_DARK_MODE(state) {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light');
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await apiService.post('/login', credentials);
        const { username, access_token, profile_image_url } = response.data;
        const userData = { username, token: access_token, profile_image_url };
        commit('SET_USER', userData);
        return userData;
      } catch (error) {
        console.error('Login action error:', error);
        throw error;
      }
    },
    async register({ commit }, userData) {
      try {
        const response = await apiService.post('/register', userData);
        const { username, access_token, profile_image_url } = response.data;
        const newUser = { username, token: access_token, profile_image_url };
        commit('SET_USER', newUser);
        return newUser;
      } catch (error) {
        console.error('Register action error:', error);
        throw error;
      }
    },
    logout({ commit }) {
      commit('SET_USER', null);
    },
    toggleDarkMode({ commit }) {
      commit('TOGGLE_DARK_MODE');
    }
  }
});