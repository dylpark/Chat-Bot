<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
      <ChatBot/>
    </v-main>
  </v-app>
</template>

<script>
import ChatBot from './components/ChatBot';

export default {
  name: 'App',

  components: {
    ChatBot,
  },

  data: () => ({
    //
  }),
};
</script>
