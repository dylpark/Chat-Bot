<template>

  <v-container>

    <v-row>
      <v-col cols="4" offset="8">
        <v-card >

          <v-toolbar
            color="pink"
            dark
            dense
            type="button"
            @click="open"
          >

          <v-toolbar-title>
            Live Chat
          </v-toolbar-title>

          <v-spacer></v-spacer>
        
          <v-icon 
            large
            color="white"
            >mdi-message-text
          </v-icon>

          </v-toolbar>

            <div v-if="openChat" >
              <ul>
                <v-list shaped
                v-for="(message, index) in messages"
                :key="index"
                :class="message.author"
                >
                  <p>
                    <span>{{ message.author }}</span>
                    <span>{{ message.text }}</span>
                  </p>
                </v-list>
              </ul>
            </div>

            <v-row>
              <v-col cols="9">

                <v-text-field 
                  type="text" 
                  v-model="message" 
                  @keyup.enter="sendMessage"
                  label="Main input"
                  :rules="rules"
                  hide-details="auto">
                </v-text-field>

              </v-col>
              <v-col cols="2">

                <v-btn
                  elevation="2"
                  color="blue"
                  outlined
                  rounded
                >Send
                </v-btn>

              </v-col>
            </v-row>
        </v-card>
      </v-col>
    </v-row>

      <!--------------------------
      <v-btn class="close-button"
        elevation="2"
        color="red"
        outlined
        small
        type="button" 
        @click="close">Close
      </v-btn>
      --------------------------->

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
        author: 'Bot: '
        })
    }
  },

  methods: {

    open() {
      this.openChat = true;
      this.connection.send('Hello!')
    },

    sendMessage() {
      this.connection.send(this.message)
      this.messages.push({
        text: this.message,
        author: 'Client: '
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