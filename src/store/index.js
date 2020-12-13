
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        allQualities:{},
        arrayTemporalTarifasPorFecha: [
            [
               200,
               250,
               300,
               310,
               390,
            ],
            [
              190,
               200,
               230,
               210,
               250,
            ],
            [
              210,
               250,
               300,
               310,
               390,
            ],
            [
              190,
               200,
               230,
               210,
               250,
            ],
            [
              410,
               350,
               300,
               250,
               200,
            ]
        ],
        averagesAllDates: [],
        referenceHotel: '',
        iWant: '',
        results: []
    },
    mutations: {
        SET_ALL_QUALITY(state, allQualities) {
            state.allQualities = allQualities;
          },
        SET_HOTEL_REFERENCE(state, referenceHotel) {
            state.referenceHotel = referenceHotel;
        },
        SET_I_WANT(state, iWant) {
            state.iWant = iWant;
        },
        SET_RESULTS(state, results) {
            state.results = results;
        },
    },
    getters: {
        averagePerDate(state) {
            return state.arrayTemporalTarifasPorFecha.forEach((item)=>{
                const sum = item.reduce((previous, current) => current += previous);
                const avg = sum / item.length;
                state.averages.push({
                average: avg
                })
            })
        },
    }
});