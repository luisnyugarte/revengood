

<template>
  <div>
    <div>
      <v-alert
        v-model="alertMax"
        border="top"
        type="error"
        close-text="Cerrar"
        dark
        dismissible
        transition="scale-transition"
      >
        Puede agregar maximo 10 hoteles.
      </v-alert>
    </div>
    <v-container fluid>
    <v-row> 
      <v-col
        cols="4"
        sm="6"
      >
        <div class="d-flex justify-center align-center">
          <p style="text-align:center;font-weight:bold;" class="m-0 mr-2">Tabla de calidad</p>
        <v-icon
          @mouseleave="hintQuality = false"
          @mouseover="hintQuality = true"
          style="cursor:pointer;"
        >mdi-progress-question</v-icon>
        <span v-if="hintQuality" class="hint">
          Aquí podrá agregar o eliminar su competencia para poder comparar datos basados en la calidad.
          <br> PD: Puede agregar un máximo de 10 hoteles, contando el suyo.
        </span>
        </div>
        <table class="table table-hover table-bordered mt-4">
          <thead>
            <tr>
              <th scope="col">Hoteles</th>
              <th scope="col" style="border-right: none;">Calidad</th>
              <th scope="col" style="border-left: none;"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(hotel, index) in hotels"
              :key="index">
              <td scope="col" v-if="hotel.name === ''">
                <v-autocomplete
                  v-model="hotels[index].name"
                  :items="hotelsFromApi"
                  dense
                  class="select quality"
                  label="Competencia"
                  v-on:change="changeHotel(hotels[index].name, index)"
                ></v-autocomplete>
              </td>
              <td scope="col" v-else> {{ hotel.name }}</td>
              <td style="border-right: none;">
                <v-autocomplete
                  v-model="hotels[index].quality"
                  :items="qualities"
                  dense
                  class="select quality"
                  label="Calidad"
                  v-on:change="changeQuality(hotels[index].quality, index)"
                ></v-autocomplete>
              </td>
              <td style="text-align:center;border-left: none;">
                <v-icon v-if="index !== 0"
                medium color="orange" @click="deleteHotel(index)">mdi-delete</v-icon>
              </td>
            </tr>
          </tbody>
        </table>
        <td class="d-flex justify-start flex-column">
          <v-btn
            @mouseleave="addText = false"
            @mouseover="addText = true"
            @click="addHotel()"
            outlined
            absolute
            right
            color="orange"
            small>
            <template v-if="addText"> Agregar hotel</template>
          <v-icon>mdi-plus</v-icon>
          </v-btn>
        </td>
      </v-col>
      <v-col
        cols="4"
        sm="6"
    >
    <p style="text-align:center; font-weight:bold;">Resultados</p>
      <table class="table table-hover table-bordered">
          <tr>
            <td>
              Promedio del Set
            </td>
            <td>{{ myAverageSet.toFixed(2) }}</td>
            </tr>
            <tr>
              <td>
              Competitiva VS Set
              </td>
              <td>{{ competitiveSet.toFixed(2) }}</td>
            </tr>
            <tr v-for="(result, index) in results"
            :key="index">
            <template v-if="result.name !== ''">
              <td>
                Competitiva VS {{ result.name}}
              </td>
              <td>{{result.value.toFixed(2)}}</td>
              </template>
            </tr>
      </table>
      </v-col>
      </v-row> 
      <v-row style="padding-top: 5rem;"> 
      <!-- Filters -->
      <v-col
        cols="12"
        sm="3">
      </v-col>
      <v-col
        cols="12"
        sm="6">
          <p style="text-align:center; font-weight:bold;">Filros</p>
      <table class="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">Quiero</th>
              <th scope="col">Hotel referencia</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <v-select
                  v-model="iWant"
                  :items="ocupations"
                  dense
                  class="select"
                  label="Quiero"
                ></v-select>
              </td>
              <td>
                <v-autocomplete
                  v-model="referenceHotel"
                  :items="hotelsFromApi"
                  dense
                  class="select"
                  label="Hotel referencia"
                ></v-autocomplete>
              </td>
            </tr>
          </tbody>
      </table>
      </v-col>
      <v-col
        cols="12"
        sm="3">
      </v-col>
      </v-row> 
    </v-container>
    <footer class="footer">
      <v-btn
        outlined
        absolute
        right
        color="orange"
        large
      >
      Guardar cambios</v-btn>
    </footer>
  </div>
</template>
<script>
import { mapState } from 'vuex';
/* eslint-disable no-debugger */
  export default {
    name: 'Admin',
    data () {
      return {
        qualities: [
          '1',
          '1.1',
          '1.2',
          '1.3',
          '1.4',
          '1.5',
          '1.6',
          '1.7',
          '1.8',
          '1.9',
          '2',        
          '2.1',
          '2.2',
          '2.3',
          '2.4',
          '2.5',
          '2.6',
          '2.7',
          '2.8',
          '2.9',
          '3',         
          '3.1',
          '3.2',
          '3.3',
          '3.4',
          '3.5',
          '3.6',
          '3.7',
          '3.8',
          '3.9',
          '4',
          '4.1',
          '4.2',
          '4.3',
          '4.4',
          '4.5',
          '4.6',
          '4.7',
          '4.8',
          '4.9',
          '5',
        ],
        hotelsFromApi: [
          'Hotel 1',
          'Hotel 2',
          'Hotel 3',
          'Hotel 4',
          'Otto Hotel suites',
          'City Express'
        ],
        hotels:[
          {
            name: 'Revengood city hotel',
            quality: ''
          }
        ],
        myAverageSet: 0,
        competitiveSet: 0,
        alertMax: false,
        ocupations: [
          'Subir ocupación',
          'Ser competitivo',
          'Optimizar TP',
        ],
        addText: false,
        hintQuality: false
      }
    },
    computed: {
      ...mapState({
        averagesAllDates: 'averagesAllDates',
        referenceHotel: 'referenceHotel',
        iWant: 'iWant',
        results: 'results'
      }),
      referenceHotel: {
        get() {
          return this.$store.state.referenceHotel;
        },
        set(value) {
          this.$store.commit('SET_HOTEL_REFERENCE', value);
        },
      },
      iWant: {
        get() {
          return this.$store.state.iWant;
        },
        set(value) {
          this.$store.commit('SET_I_WANT', value);
        },
      },
    },
    watch: {
      results(value) {
        this.$store.commit('SET_RESULTS', value);
      }
    },
    methods: {
      changeQuality(quality, index) {
        this.hotels[index].quality = quality;
        this.$store.commit('SET_ALL_QUALITY', this.hotels);
        this.averageSet();
        this.averageOneToOne();
      },
      changeHotel(value, index) {
        this.results[index - 1].name = value;
        this.results[index - 1].value = 0;
      },
      averageSet() {
        let mySumAverageSet = 0;
        if(this.hotels.length > 1) {
          this.hotels.forEach((item, idx) => {
          if(item.quality !== '' && idx !== 0) {
            mySumAverageSet += Number(item.quality);
          }
        });
        this.myAverageSet = mySumAverageSet / (this.hotels.length - 1);
          if(this.myAverageSet !== 0) {
            this.competitiveSet = Number(this.hotels[0].quality) / this.myAverageSet;
          }
        }        
      },
      averageOneToOne() {
       if (this.results.length > 0) {
          this.results.forEach((result, idx) => {
          result.value =  Number(this.hotels[0].quality) / Number(this.hotels[idx + 1].quality);
        });
       }
      },
      addHotel() {
        if(this.hotels.length <= 9) {
          this.hotels.push({
            name: '',
            quality: ''
          });
          this.results.push({
            name: '',
            value: 0
          })
          
        } else {
          this.alertMax = true;
        }
      },
      deleteHotel(index) {
        this.hotels.splice(index, 1);
        this.results.splice(index - 1, 1);
        
      }
    }
  }
</script>
<style lang="scss">
  .select {
    max-width: 250px;
    &.quality {
      margin: 0;
      .v-text-field__details {
        display: none;
      }
    }
  }
  .note {
    font-size: 10px;
    font-style: italic;
  }
  .table-bordered td {
    vertical-align: middle !important;
    width: 50%;
  }
  .footer {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 100px;
    display: flex;
    align-items: center;
    box-shadow: 0px 0px 8px 1px #ccc;
  }
</style>