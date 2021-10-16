<template>
  <v-container>
    <div class="chat-bot">

    <v-btn class="open-button"
    type="button" 
    @click="open"> Open Chat
    </v-btn>

    <v-btn class="close-button" 
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
      messages: []
    }

  },
  mounted() {
    this.connection = new WebSocket('ws://localhost:3000')
  },
  methods: {
    open() {
      this.openChat = true;
          this.connection.send('New Connection From Client')
    },
    sendMessage() {
      let message = this.message
      let botMessage = this.connection.send(`Bot: ${message}`)

      this.messages.push({
        text: message,
        author: 'client'
      })

      this.connection.send(message)

      message = ''

      .then(() => {
        this.message.push({
          text: botMessage,
          author: 'bot'
        })
      })

      // this.connection.send(this.currentMessage)
      // {
      //   text: this.currentMessage,
      //   author: 'Client'
      // })

      // this.connection.send(this.message)
      // messages.push(this.message);
      // {
      //   text: 'Response from Bot',
      //   author: 'Bot'
      // })
    },
    close() {
      this.openChat = false;
      this.connection.send('Chat Ended')
      this.connection.close();
    }
  }
}
</script>