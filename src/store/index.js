import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// store.js
export default new Vuex.Store({
  state: {
    user: null,  // Kullanıcı bilgilerini içeren bir obje (username ve token)
  },
    mutations: {
      setUser(state, { username, token }) {
        state.user = { username, token };  // Kullanıcı bilgilerini içeren bir obje
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
    },
    actions: {
      setUser({ commit }, { username, token }) {
        commit('setUser', { username, token });
        localStorage.setItem('user', JSON.stringify({ username, token }));
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
    }
  });
  
