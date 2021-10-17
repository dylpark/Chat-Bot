<template>
  <v-container fluid>
    <v-row class="mb-6">
      <v-col 
      md="6"
      offset-md="6">
        <v-card 
        class="mx-auto" 
        width="300"
        shaped
        >
          <v-list>
            <v-list-group
              :value="false"
              prepend-icon="mdi-message-text"
              @click="open"
            >
              <template v-slot:activator>
                <v-list-item-title>Contact Support</v-list-item-title>
              </template>
              <div v-if="openChat">
                <v-list shaped>
                  <v-list-item
                    two
                    line
                    v-for="(message, index) in messages"
                    :key="index"
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{ message.text }}</v-list-item-title>
                      <v-list-item-subtitle>{{ message.author }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-col cols="12">
                  <v-text-field
                    type="text"
                    label="Message"
                    outlined
                    hide-details="auto"
                    v-model="message"
                    @keyup.enter="sendMessage"
                  >
                    <v-btn
                      slot="append-outer"
                      elevation="1"
                      color="primary"
                      @click="sendMessage"
                      >Send
                    </v-btn>
                  </v-text-field>
                </v-col>
              </div>
            </v-list-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  name: "ChatBot",
  data() {
    return {
      openChat: false,
      connection: null,
      message: "",
      messages: [],
      justify: [
        'start',
        'center',
        'end',
        'space-around',
        'space-between',
      ]
    }
  },
  mounted() {
    this.connection = new WebSocket("ws://localhost:3000");
    this.connection.onmessage = (event) => {
      console.log("Got this back: " + event.data);
      this.messages.push({
        text: event.data,
        author: "Bot",
      });
    };
  },

  methods: {
    open() {
      this.openChat = true;
      this.connection.send("Hello!");
    },

    sendMessage() {
      this.connection.send(this.message);
      this.messages.push({
        text: this.message,
        author: "Client",
      });
    },

    close() {
      this.openChat = false;
      this.connection.send("Chat Ended");
      this.connection.close();
    },
  },
};
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