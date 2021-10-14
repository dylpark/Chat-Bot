<template>
  <section class="chat-bot">

    <button class="open-button"
    type="button" 
    @click="open"> Open Chat
    </button>

    <button class="close-button" 
    type="button" 
    @click="close">Close Chat
    </button>
      
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
        
        <input 
        type="text" 
        v-model="message" 
        @keyup.enter="sendMessage"
        />
        
        <button @click="sendMessage">Send</button>

      </div>
  </section>
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
      this.connect.send({
        text: this.currentMessage,
        author: 'Client'
      })

      this.connection.send({
        text: 'Response from Bot',
        author: 'Bot'
      })
    },
    close() {
      this.openChat = false;
      this.connection.close();
    }
  }
}
</script>

<style scoped>
  /* .open-button {
    background-color: #555;
    color: white;
    padding: 16px 20px;
    border: none;
    cursor: pointer;
    opacity: 0.8;
    position: relative;
    bottom: 23px;
    right: 28px;
    width: 280px;
  }

  .close-button {
    background-color: #ff0000;
    color: white;
    padding: 16px 20px;
    border: none;
    cursor: pointer;
    opacity: 0.8;
    position: relative;
    bottom: 23px;
    right: 28px;
    width: 280px;
  }

.chat-box,
.chat-box-list {
  display: flex;
  flex-direction: column;
  list-style-type: none;
}

.chat-box-list-container {
  overflow: scroll;
  margin-bottom: 1px;
}

.chat-bot-list {
  padding-left: 10px;
  padding-right: 10px;
}

.chat-bot-list, span {
  padding: 8px;
  color: white;
  border-radius: 4px;
}

.chat-bot-list, .server, span {
    background: #99cc00;
}

.chat-bot-list, .server, p {
    float: right;
}

.chat-bot-list, .client, span {
    background: #0070C8;
}

.chat-bot-list, .client, p {
    float: left;
}

.chat-bot {
  max-width: 300px;
  padding: 10px;
  background-color: white;
}

.chat-inputs {
  background-color: #ddd;
  outline: none;
}

.chat-inputs, input {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
  resize: none;
  min-height: 200px;
}

.chat-inputs, button {
  background-color: #04AA6D;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom:10px;
  opacity: 0.8;
} */

</style>