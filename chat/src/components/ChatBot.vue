<template>

  <div>

    <v-card
      class="d-flex flex-row-reverse"
      :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
      flat
      tile
    >
      <v-card
        v-for="n in 3"
        :key="n"
        class="pa-2"
        outlined
        tile
      >
        Flex item {{ n }}
      <div>

      <div class="chat-bot">

      <v-btn class="open-button"
        elevation="2"
        outlined
        depressed
        small
        x-large
        type="button" 
        @click="open">Open
      </v-btn>

      <v-btn class="close-button"
        elevation="2"
        outlined
        depressed
        small
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
    </div>
  </v-card>
  </v-card>
  </div>

</template>


<!----------------------------------------------------------------
<template>
<v-container>
  <v-row justify="space-between">
    
    <v-col md="3">
      <div class="chat-bot">

      <v-btn class="open-button"
        elevation="2"
        outlined
        depressed
        small
        x-large
        type="button" 
        @click="open">Open
      </v-btn>

      <v-btn class="close-button"
        elevation="2"
        outlined
        depressed
        small
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
      
      </div>

      </div>

    <v-row justify="space-around">
      <v-col md="3">
              <v-btn @click="sendMessage">Send</v-btn>
      </v-col>
    </v-row>
      
    </v-col>

  </v-row> 
</v-container>
</template>
---------------------------------------------------------------->

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