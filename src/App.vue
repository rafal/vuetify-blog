<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-title>Vuetify Blog</v-app-bar-title>
      <v-spacer />
      <v-btn
        to="/"
        text
      >
        Home
      </v-btn>
      <v-btn
        to="/create"
        text
      >
        Create Post
      </v-btn>
      <v-btn
        icon
        @click="toggleTheme"
      >
        <v-icon>{{ isDarkTheme ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <v-footer
      app
      padless
    >
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Vuetify Blog</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    isDarkTheme: false,
  }),
  created() {
    const storedTheme = localStorage.getItem('vuetify-theme');
    if (storedTheme) {
      this.isDarkTheme = storedTheme === 'dark';
      this.$vuetify.theme.global.name = this.isDarkTheme ? 'dark' : 'light';
    }
  },
  methods: {
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
      this.$vuetify.theme.global.name = this.isDarkTheme ? 'dark' : 'light';
      localStorage.setItem('vuetify-theme', this.isDarkTheme ? 'dark' : 'light');
    }
  },
};
</script>
