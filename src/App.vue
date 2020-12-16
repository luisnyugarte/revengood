<template>
  <v-app>
  <template>
    <v-card>
      <v-toolbar
        color="white"
        light
        flat
      >
        <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

        <!-- <v-toolbar-title>Your Dashboard</v-toolbar-title> -->
        <v-img
          v-bind:src="require('./assets/my_logo.png')"
          max-height="40"
          max-width="200"/>
        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>

        <template v-slot:extension>
          <v-tabs
            v-model="tab"
            align-with-title
          >
            <v-tabs-slider color="blue"></v-tabs-slider>

            <v-tab
              v-for="item in items"
              :key="item.tab"
              @click="test(item.id)"
            >
              {{ item.tab }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="item in items"
          :key="item.tab"
        >
          <v-card flat>
            <v-card-text></v-card-text>
              <component v-bind:is="item.content"></component>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </template>
  </v-app>
</template>

<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.2.0/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBBmClgx96UgRs6aisTpZYehw7vkJBUNOA",
    authDomain: "reven-good.firebaseapp.com",
    databaseURL: "https://reven-good.firebaseio.com",
    projectId: "reven-good",
    storageBucket: "reven-good.appspot.com",
    messagingSenderId: "932527034126",
    appId: "1:932527034126:web:36957b3f475dfb7330d15f",
    measurementId: "G-7N71Z1VX2T"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>
<script>
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';

export default {
  name: 'App',
  components: {
    Dashboard,
    Admin,
  },

  data: () => ({
     tab: null,
      items: [
        { tab: 'Dashboard', content: 'Dashboard', id: 1 },
        { tab: 'Administrador', content: 'Admin', id: 2}
      ]
  }),
  methods: {
    test(id) {
      if(id === 2) {
        this.$store.getters['averagePerDate'];
      }
    }
  }
};
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';
.v-card.v-card--flat.v-sheet.theme--light {
    min-height: calc(100vh - 112px);
}
.hint {
  width: 180px;
  font-size: 10px;
  padding: .5rem;
  background: #2296f3;
  color: white;
  border-radius: 4px;
  font-weight: bold;
  position: absolute;
  right: 1rem;
  top: -5.5rem;
  &:after {
    content: "";
    width: 0;
    height: 0;
    border-left: 10px solid #2296f3;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    left: 12px;
    position: absolute;
    bottom: -14px;
    transform: rotate(90deg);
  }
}
</style>