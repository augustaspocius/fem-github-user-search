// src/store/index.ts
import { createStore } from 'vuex';

export default createStore({
  state: {
    isDarkMode: true,
  },
  mutations: {
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },
  },
  actions: {
    toggleDarkMode({ commit }) {
      commit('toggleDarkMode');
    },
  },
  getters: {
    isDarkMode: (state) => state.isDarkMode,
  },
});
