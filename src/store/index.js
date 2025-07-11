import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// store.js
export default new Vuex.Store({
  state: {
    user: null,  // Kullanıcı bilgilerini içeren bir obje (username ve token)
    isDarkMode: localStorage.getItem('theme') === 'dark' // Tema durumunu localStorage'dan al
  },
    mutations: {
      setUser(state, { username, token, profile_image_url }) {
        state.user = { username, token, profile_image_url };  // Kullanıcı bilgilerini içeren bir obje
      },
      setToken(state, token) {
        state.token = token;
        localStorage.setItem('token', token);  // Token'ı local storage'a kaydet

      },
      resetUser(state) {
        state.user = null;
      },
      resetToken(state) {
        state.token = null;
        localStorage.removeItem('token');  // Token'ı local storage'dan sil

      },
      toggleDarkMode(state) {
        state.isDarkMode = !state.isDarkMode;
        localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light'); // Temayı localStorage'a kaydet
      }
    },
    actions: {
      setUser({ commit }, { username, token, profile_image_url }) {
        commit('setUser', { username, token, profile_image_url });
        localStorage.setItem('user', JSON.stringify({ username, token, profile_image_url }));
        // İkinci parametre olarak bir obje geçir
      },
      setToken({ commit }, token) {
        commit('setToken', token);
        // Token set edildikten sonra setUser action'ını çağır
        if (token) {
          commit('setUser', { username: '', token });
        }
      },
      logout({ commit }) {
        commit('resetUser');
        localStorage.removeItem('user');

      },
      toggleDarkMode({ commit }) {
        commit('toggleDarkMode');
      }
    }
  });