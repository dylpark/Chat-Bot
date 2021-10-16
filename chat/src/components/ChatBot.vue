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
              <ul class="chat-bot-list">
                <v-list-item 
                two line 
                shaped
                v-for="(message, index) in messages"
                :key="index"
                :class="message.author"                
                >
                
                <v-list-item-content>
                  <v-list-item-title>{{ message.text }}</v-list-item-title>
                  <v-list-item-subtitle>{{ message.author }}</v-list-item-subtitle>
                </v-list-item-content>

                </v-list-item>
              </ul>
              

            </div>

            <v-row>
              <v-col cols="9">

                <v-text-field 
                  type="text"
                  label="Message"
                  outlined
                  hide-details="auto" 
                  v-model="message" 
                  @keyup.enter="sendMessage"
                  >
                </v-text-field>

              </v-col>
              <v-col cols="1">
                    <v-btn
                    slot="append-outer"
                    elevation="1"
                    color="primary"
                    
                    rounded
                    @click:append="sendMessage"
                    >Send
                  </v-btn>
                

              </v-col>
            </v-row>

        </v-card>
      </v-col>
    </v-row>

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
      items: [
        {
          action: 'mdi-message-text',
          items: [{ title: 'List Item' }],
          title: 'Live Chat',
        },
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
      this.connection.send('Hello!')
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

<style scoped lang="scss">

// .chat-bot-list {
//   padding-left: 0px;

//   span {
//     padding: 8px;
//     color: white;
//     border-radius: 4px;
//   }

//   .Bot {
//     span {
//       background: violet;
//     }
//     p {
//       float: left;
//     }
//   }

//     .Client {
//     span {
//       background: blue
//     }
//     p {
//       float: right;
//     }
//   }
// }

</style>