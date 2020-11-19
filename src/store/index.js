
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        allQualities:{}
    },
    mutations: {
        SET_ALL_QUALITY(state, allQualities) {
            state.allQualities = allQualities;
          },
    }
});