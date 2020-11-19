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
        { tab: 'Dashboard', content: 'Dashboard' },
        { tab: 'Administrador', content: 'Admin' }
      ]
  }),
};
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>