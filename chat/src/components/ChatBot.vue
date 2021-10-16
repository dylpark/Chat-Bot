<template>

  <v-container>
    <v-card
      class="d-flex flex-row-reverse"
      :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
      flat
      tile
    >
      <v-card
        v-for="n in 1"
        :key="n"
        class="pa-2"
        outlined
        tile
      >
        Flex item {{ n }}

      <div class="chat-bot">

      <v-btn class="open-button"
        elevation="2"
        outlined
        depressed
        x-large
        type="button" 
        @click="open">Open
      </v-btn>

      <v-btn class="close-button"
        elevation="2"
        outlined
        depressed
        x-large
        type="button" 
        @click="close">Close Chat
      </v-btn>

      <div v-if="openChat" class="chat-bot-list-container">
        <ul class="chat-bot-list">
          <li class="message"
            v-for="(message, index) in messages"
            :key="index"
            :class="message.author"
          >
          <p>
            <span>{{ message.author }}</span>
            <span>{{ message.text }}</span>
          </p>
          </li>
        </ul>
      </div>

      <div class="chat-inputs">
        <v-text-field 
        type="text" 
        v-model="message" 
        @keyup.enter="sendMessage"
        label="Main input"
        :rules="rules"
        hide-details="auto">
        </v-text-field>

        <v-btn @click="sendMessage">Send</v-btn>
      </div>

      </div>

  </v-card>
  </v-card>

  </v-container>

</template>

<script>
export default {
  name: 'ChatBot',
  data() {
    return {
      openChat: false,
      connection: null,
      message: '',
      messages: [],
      alignments: [
        'start',
        'center',
        'end',
      ],
    }

  },
  mounted() {
    this.connection = new WebSocket('ws://localhost:3000')
    this.connection.onmessage = (event) => {
      console.log("Got this back: " + event.data)
      this.messages.push({
        text: event.data,
        author: 'bot'
        })

    }
  },

  methods: {

    open() {
      this.openChat = true;
      this.connection.send('User opened chat')
    },

    sendMessage() {
      this.connection.send(this.message)
      this.messages.push({
        text: this.message,
        author: 'client'
      })
    },

    close() {
      this.openChat = false;
      this.connection.send('Chat Ended')
      this.connection.close();
    }
  }
}
</script>