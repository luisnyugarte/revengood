/* eslint-disable vue/require-v-for-key */
<template>
 <v-container fluid>
  <v-row> 
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Seleccionar fechas"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          range
          locale="es-co"
          
        ></v-date-picker>
      </v-menu>
    </v-col>
  </v-row> 
     <v-row> 
        <v-col
        cols="10"
        sm="10"
      >
      <h2>Sugerencias</h2>
      <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Fechas</th>
                <th scope="col"
                  v-for="(i, index) in headers" :key="index">
                  {{ i }}
                </th>
            </tr>
          </thead>
          <tbody>
            <!-- eslint-disable-next-line vue/no-template-key -->
              <tr v-for="(item, index) in dataTable" :key="index"> 
                <td> {{item.date}}</td>
                <td v-for="(i, idx) in item.prices" :key="idx">
                <p :class="idx === 0 ? getColor(item.hotel) : 'normal'"
                  @mouseover="predictionHint = idx"
                  @mouseleave="predictionHint = null">
                  $ {{i.price}}
                </p>
                <span class="predictionHint" v-show="idx === 0 && predictionHint === idx">
                  <ul>
                    <li class="title">Puntuación: <strong>4.5</strong></li>
                    <li>200</li>
                    <li>300</li>
                    <li>400</li>
                  </ul>
                </span>
                </td>
              </tr>
          </tbody>
        </table>
      </v-col>
       <v-col
        cols="2"
        sm="2"
      >
        <h2>Hotel referencia</h2>
         <table class="table table-hover" style="text-align: right;">
          <thead>
            <tr>
              <th scope="col"> 
                <p v-if="referenceHotel !== ''">
                  {{referenceHotel}}
                </p>
                <p v-else>No ha seleccionado un hotel referencia</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in priceFromReference" :key="idx">
              <td>{{item.toFixed()}}</td>
            </tr>
          </tbody>
        </table>
      </v-col>
    </v-row> 
   </v-container>
</template>
<script>
import { mapState } from 'vuex';
  export default {
    name: 'Dashboard',
    data () {
      return {
        predictionHint: null,
        color: '',
        headers: [
          'your hotel',
          'Hotel 1',
          'Hotel 2',
          'Hotel 3',
          'Hotel 4',
          'Otto Hotel suites',
          'City Express'
        ],
        dataTable: [
          {
            id: 1,
            date: '01/12/2020',
            prices: [
              {
                hotel: 'Your hotel',
                price: 220
              },
              {
                hotel: 'Hotel 1',
                price: 200
              },
              {
                hotel: 'Hotel 2',
                price: 205
              },
              {
                hotel: 'Hotel 3',
                price: 234
              },
              {
                hotel: 'Hotel 4',
                price: 222
              },
              {
                hotel: 'Otto Hotel suites',
                price: 213
              },
              {
                hotel: 'City Express',
                price: 213
              },
            ]
          },
          {
            id: 2,
            date: '02/12/2020',
            prices: [
              {
                hotel: 'Your hotel',
                price: 220
              },
              {
                hotel: 'Hotel 1',
                price: 200
              },
              {
                hotel: 'Hotel 2',
                price: 205
              },
              {
                hotel: 'Hotel 3',
                price: 234
              },
              {
                hotel: 'Hotel 4',
                price: 222
              },
              {
                hotel: 'Otto Hotel suites',
                price: 213
              },
              {
                hotel: 'City Express',
                price: 213
              },
            ]
          },
          {
            id: 3,
            date: '03/12/2020',
            prices: [
              {
                hotel: 'Your hotel',
                price: 220
              },
              {
                hotel: 'Hotel 1',
                price: 200
              },
              {
                hotel: 'Hotel 2',
                price: 205
              },
              {
                hotel: 'Hotel 3',
                price: 234
              },
              {
                hotel: 'Hotel 4',
                price: 222
              },
              {
                hotel: 'Otto Hotel suites',
                price: 213
              },
              {
                hotel: 'City Express',
                price: 213
              },
            ]
          },
        ],
        dataTableReference: [
          {
            date: '01/02/2020',
            price: 200,
          },
        ],
        date: new Date().toISOString().substr(0, 10),
        menu: false,
      }
    },
    computed: {
      ...mapState({
        referenceHotel: 'referenceHotel',
        iWant: 'iWant',
        results: 'results'
      }),
      priceFromReference() {
        if(this.results.length > 0 && this.referenceHotel !== '') {
          const realPrices = [];
          const myReference = this.results.find((hotel)=>{
            return hotel.name.toLowerCase() === this.referenceHotel.toLowerCase();
          });
         this.dataTable.forEach((date)=>{
            date.prices.forEach((i)=>{
              if(i.hotel.toLowerCase() === myReference.name.toLowerCase()) {
                realPrices.push(i.price)
              }
            });
          });
          if(this.iWant.toLowerCase() === 'Ser competitivo'.toLowerCase()) {
            const priceReference = [];
            realPrices.forEach((item) => {
              priceReference.push(item * myReference.value)
            });
            return priceReference;
          } else if(this.iWant.toLowerCase() === 'Subir ocupación'.toLowerCase()) {
            const priceReference = [];
            realPrices.forEach((item) => {
              priceReference.push(item * (myReference.value - 0.04))
            });
            return priceReference;
          }  else if(this.iWant.toLowerCase() === 'Optimizar TP'.toLowerCase()) {
              const priceReference = [];
              realPrices.forEach((item) => {
                priceReference.push(item * (myReference.value + 0.04))
              });
              return priceReference;
          }
        }
        return null
      },
    },
    methods: {
      getColor (value) {
        if (value > 400) {
          return 'error';
        } else if (value > 200) {
          return 'warning';
        } else {
          return 'success';
        }
      },
    },
  }
</script>
<style lang="scss">
  h2 {
      white-space: nowrap;
      font-size: 20px !important;
      padding-bottom: 1rem;
  }
  .v-application {
    .table {
      overflow-x: auto;
      display: block;
      max-width: 100%;
      th {
        min-width: 100px;
    vertical-align: middle; 
        p {
          padding: 0;
          margin: 0;
          margin-bottom: 0;
        }
      }
    }
  }
  td {
    position: relative;
    p {
      margin: 0;
      display: inline;
      color: #ffffff;
      padding: 4px 6px;
      border-radius: 16px;
      font-weight: bold;
      cursor: pointer;
      &.normal {
        color: #424242;
        cursor: auto;
        font-weight: 400;;
      }
    }
    .predictionHint {
      position: absolute;
      top: 0;
      background: #fff;
      padding: .5rem 1rem;
      box-shadow: 2px 1px 2px 0px #ccc;
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
          &.title {
            color: #424242;
            font-size: 12px !important;
            strong {
              color: green;
            }
          }
        }
      }
    }
  }
</style>