<template>

  <v-container pa=0>

    <v-row>

      <v-col cols="4" offset="8">
        <v-toolbar
        color="pink"
        dark
        dense
        type="button"
        @click="open"
        >
          <v-toolbar-title 
          class="chat-title"
          >
          Live Chat
          </v-toolbar-title>

          <v-spacer></v-spacer>
        
          <v-icon 
          large
          color="white"
          >mdi-message-text
          </v-icon>

      </v-toolbar>
      </v-col>

    </v-row>

      <v-btn class="close-button"
        elevation="2"
        color="red"
        outlined
        small
        type="button" 
        @click="close">Close
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

        <v-btn 
        elevation="2"
        outlined
        small
        @click="sendMessage">Send
        </v-btn>
      </div>

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
        author: 'Bot'
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
        author: 'Client'
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