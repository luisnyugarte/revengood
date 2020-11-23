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
        cols="12"
        sm="12"
      >
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Fechas</th>
              <th scope="col"
                v-for="(item, index) in headers"
                :key="index">
                {{ item.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in dataTable" :key="idx">
              <td>{{ item.date }}</td>
              <td
                @mouseover="predictionHint = idx"
                @mouseleave="predictionHint = null">
                <p :class="getColor(item.hotel)">
                  $ {{ item.hotel }}
                </p>
                <span class="predictionHint" v-show="predictionHint === idx">
                  <ul>
                    <li class="title">Puntuación: <strong>4.5</strong></li>
                    <li>200</li>
                    <li>300</li>
                    <li>400</li>
                  </ul>
                </span>
              </td>
              <td>$ {{ item.hotel1 }}</td>
              <td>$ {{ item.hotel2 }}</td>
              <td>$ {{ item.hotel3 }}</td>
              <td>$ {{ item.hotel4 }}</td>
            </tr>
          </tbody>
        </table>
      </v-col>
    </v-row> 
   </v-container>
</template>
<script>
  export default {
    name: 'Dashboard',
    data () {
      return {
        predictionHint: null,
        color: '',
        headers: [
          {
            name: 'Your hotel',
            value: 1,
          },
          {
            name: 'Hotel 1',
            value: 2,
          },
          {
            name: 'Hotel 2',
            value: 3,
          },
          {
            name: 'Hotel 3',
            value: 4,
          },
          {
            name: 'Hotel 4',
            value: 5,
          }
        ],
        dataTable: [
          {
            date: '01/02/2020',
            hotel: 200,
            hotel1: 250,
            hotel2: 300,
            hotel3: 310,
            hotel4: 390,
          },
          {
            date: '02/02/2020',
            hotel: 190,
            hotel1: 200,
            hotel2: 230,
            hotel3: 210,
            hotel4: 250,
          },
          {
            date: '03/02/2020',
            hotel: 210,
            hotel1: 250,
            hotel2: 300,
            hotel3: 310,
            hotel4: 390,
          },
          {
            date: '04/02/2020',
            hotel: 190,
            hotel1: 200,
            hotel2: 230,
            hotel3: 210,
            hotel4: 250,
          },
          {
            date: '05/02/2020',
            hotel: 410,
            hotel1: 350,
            hotel2: 300,
            hotel3: 250,
            hotel4: 200,
          },
        ],
        date: new Date().toISOString().substr(0, 10),
        menu: false,
      }
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