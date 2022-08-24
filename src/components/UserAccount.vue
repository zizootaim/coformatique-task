<template>
  <section>
    <div class="user__data">
      <div>
        <h4>
          Name : <span> {{ userData.name }}</span>
        </h4>
        <h4>
          Email : <span>{{ userData.email }}</span>
        </h4>
      </div>
      
      <button @click="signOut">
        <img src="../assets/images/log-out.png" alt="Log Out">
      </button>
    </div>
    <div class="write__message">
      <h4>{{ editing ? "Edit" : "Write" }} Message</h4>
      <textarea cols="10" rows="5" v-model="message.content"></textarea>
      <button @click="writeMessage">
        {{ editing ? "Edit" : "Write" }} Message
      </button>
    </div>
    <div class="error" v-if="errorMsg">{{ errorMsg }}</div>
    <div class="all__msgs">
      <div v-if="userMessages.length > 0">
        <h1>My Messages</h1>
        <div class="messages">
          <div class="message" v-for="msg in userMessages" :key="msg.id">
            <header>
              <p class="post__content">{{ msg.content }}</p>
              <div class="msg__btns">
                <button @click="deleteMsg(msg.id)">
                  <i class="far fa-trash-alt"></i>
                </button>
                <button @click="editMsg(msg)">
                  <i class="far fa-edit"></i>
                </button>
              </div>
            </header>
            <div class="reply__wrapper">
              <button @click="replyToMsg(msg)">Reply</button>
              <div class="reply__field" :id="msg.id">
                <input type="text">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="otherMessages.length > 0">
        <h1>Other Messages</h1>
        <div class="messages">
          <div class="message" v-for="msg in otherMessages" :key="msg.id">
            <h4>Creator : {{ msg.creator }}</h4>
            <header>
              <p class="post__content">{{ msg.content }}</p>
            </header>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { getData, setData } from "../CommonFunctions";

export default {
  props: ["userData"],
  data() {
    return {
      user: {},
      message: { content: "" },
      editing: false,
      otherMessages: [],
      userMessages: [],
      errorMsg: "",
    };
  },
  mounted() {
    this.othe;
    this.getMsgs();
  },

  methods: {
    writeMessage: function () {
      if (this.message) {
        let newMsg = { ...this.message, content: this.message.content },
          method = "PUT";
        if (!this.editing) {
          newMsg = {
            id: Date.now(),
            user_id: this.userData.id,
            creator: this.userData.name,
            content: this.message.content,
            replies: [],
          };
          method = "POST";
        }
        const resource = "messages" + (this.editing ? `/${newMsg.id}` : "");

        setData(resource, method, JSON.stringify(newMsg)).then(() => {
          this.getMsgs();
          this.message.content = "";
          this.editing = false;
        });
      }
    },
    getMsgs() {
      getData("messages")
        .then((data) => {
          this.userMessages = data.filter((m) => m.user_id == this.userData.id);

          this.otherMessages = data.filter(
            (m) => m.user_id !== this.userData.id
          );
        })
        .catch(() => {
          this.errorMsg = "Failed to Load , Please Try again .";
        });
    },
    editMsg(msg) {
      this.message = msg;
      this.editing = true;
    },
    showReplyField(id){

    },
    replyToMsg(msg){
      console.log(msg);
    },
    deleteMsg: function (id) {
      setData(`messages/${id}`, "DELETE", "")
        .then(() => {
          this.getMsgs();
        })
        .catch(() => {
          this.errorMsg = "Failed to Delete , Please Try again .";
        });
    },
    signOut(){
      this.$emit('signOut')
    }
  },
};
</script>
<style>
.all__msgs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.message header {
  display: grid;
  grid-template-columns: 1fr 6rem;
  gap: 1rem;
}
.msg__btns {
  flex-basis: 6rem;
  justify-self: flex-end;
}
.msg__btns button {
  margin-left: 0.3rem;
  padding: 0.2rem 0.6rem;
  border-radius: 5px;
  background: none;
}
.msg__btns button:first-child {
  color: red;
}
.msg__btns button:last-child {
  color: green;
}
/* Start */
.write__message {
  width: 22rem;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
}
.write__message textarea {
  width: 100%;
  margin: 1rem 0;
  outline: none;
  padding: 0.5rem;
}
.write__message button {
  width: 10rem;
  background: rgb(0, 0, 0);
  color: #fff;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 1.1rem;
}
.user__data {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  margin: 1rem 0;
}
.user__data h4 span {
  font-weight: 600;
}
.user__data button{
  width: fit-content;
  background: none;
  display: flex;
  align-items: center;
}
.user__data button img {
  width: 1rem;
  height: 1rem;
}
.messages {
  margin-top: 1rem;
}
.message {
  padding: 0.6rem;
  border: 1px solid rgb(195, 195, 195);
  margin-bottom: 0.6rem;
}
.reply__wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
}
.reply__wrapper button {
  padding: 0.2rem 0.5rem;
  border: 1px solid #000;
  outline: none;
  background: #fff;
  color: #000;
  cursor: pointer;
}
.reply__wrapper input {
  padding: 0.2rem 0.5rem;
  outline: none;
}
.reply__field {
  opacity: 0;
  transition: 0.3s;
}
.reply__field.show {
  opacity: 1;
}

.message h4 {
  font-weight: 600;
}
.message p:not(.post__content) {
  padding-left: 0.4rem;
}
.replies {
  padding: 0.5rem;
  border-top: 1px solid;
  border-bottom: 1px solid;
  margin-top: 0.5rem;
}
.replies p:not(.replies p:last-child) {
  border-bottom: 1px solid;
}
</style>
