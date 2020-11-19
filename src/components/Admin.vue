

<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col
          cols="4"
          sm="6"
        >
          <p style="text-align:center;">Tabla de calidad</p>
          <table class="table table-hover table-bordered">
            <thead>
              <tr>
                <th scope="col">Hoteles</th>
                <th scope="col">Calidad</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(hotel, index) in hotelsGroup"
                :key="index">
                <td scope="col" >
                {{ hotel.name }}
                </td>
                <td>
                  <v-select
                    v-model="hotelsGroup[index].value"
                    :items="qualities"
                    label="Calidad"
                    dense
                    class="select quality"
                    v-on:change="changeQuality(hotelsGroup[index].value, index)"
                  ></v-select>
                </td>
              </tr>
            </tbody>
          </table>
         </v-col>
         
          <v-col
          cols="4"
          sm="6"
        >
        <p style="text-align:center;">Resultados</p>
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
                  <td>
                    Competitiva VS {{ result.name}}
                  </td>
                  <td>{{result.value.toFixed(2)}}</td>
                </tr>
          </table>
          </v-col>
       </v-row> 
    </v-container>
  </div>
</template>
<script>
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
        hotelsGroup: [
          {
            name: 'my hotel',
            value: ''          
          },
          {
            name: 'Hotel 2',
            value: ''         
          },
          {
            name: 'Hotel 3',
            value: ''
          },
          {
            name: 'Hotel 4',
            value: ''         
          },
          {
            name: 'Hotel 5',
            value: ''         
          },
        ],
        myAverageSet: 0,
        competitiveSet: 0,
        results: [
          {
            name: 'Hotel 2',
            value: 0
          },
          {
            name: 'Hotel 3',
            value: 0
          },
          {
            name: 'Hotel 4',
            value: 0
          },
          {
            name: 'Hotel 5',
            value: 0
          }
        ]
      }
    },
    methods: {
      changeQuality(value, index) {
        this.hotelsGroup[index].value = value;
        this.$store.commit('SET_ALL_QUALITY', this.hotelsGroup);
        this.averageSet();
        this.averageOneToOne(index);
      },
      averageSet() {
        let mySumAverageSet = 0;
        this.hotelsGroup.forEach((item, idx) => {
          if(item.value !== '' && idx !== 0) {
            mySumAverageSet += Number(item.value);
          }
        });
        this.myAverageSet = mySumAverageSet / (this.hotelsGroup.length - 1);
        if(this.myAverageSet !== 0) {
          this.competitiveSet = Number(this.hotelsGroup[0].value) / this.myAverageSet;
        }
        
      },
      averageOneToOne(index) {
        if(index !== 0) {
        const oneToOne = Number(this.hotelsGroup[0].value) / this.hotelsGroup[index].value;
        this.results[index - 1].value = oneToOne;
        }
      },
    }
  }
</script>
<style lang="scss" scoped>
  .select {
    max-width: 250px;
    &.quality {
      width: 100px;
      margin: 0;
    }
  }
</style>