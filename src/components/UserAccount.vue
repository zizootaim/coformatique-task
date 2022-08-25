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
        <img src="../assets/images/log-out.png" alt="Log Out" />
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
      <div v-if="allMessages.length > 0">
        <div class="messages">
          <div class="message" v-for="msg in allMessages" :key="msg.id">
            <header>
              <h4>{{ msg.creator }} {{ getYou(msg.user_id) }}</h4>
            </header>
            <p class="post__content">{{ msg.content }}</p>
            <div class="msg__btns">
              <button @click="replyToMsg(msg)">
                <i class="far fa-comment"></i>
              </button>

              <button
                v-if="msg.user_id === userData.id"
                @click="deleteMsg(msg.id)"
                class="delete__btn"
              >
                <i class="far fa-trash-alt"></i>
              </button>
              <button
                v-if="msg.user_id === userData.id"
                @click="editMsg(msg)"
                class="edit__btn"
              >
                <i class="far fa-edit"></i>
              </button>
            </div>
            <div class="reply__wrapper">
              <div class="reply__field input__field" :id="msg.id">
                <input
                  type="text"
                  placeholder="Your Reply"
                  @keyup.enter="replyToMsg(msg)"
                />
              </div>
            </div>
            <div class="replies" v-if="msg.replies.length > 0">
              <div v-for="r in msg.replies" :key="r.id">
                <span>{{ r.creator }} {{ getYou(r.user_id) }}</span>
                <p>{{ r.content }}</p>
              </div>
            </div>
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
      message: { content: "" },
      editing: false,
      allMessages: [],
      userMessages: [],
      errorMsg: "",
    };
  },
  mounted() {
    this.getMsgs();
  },

  methods: {
    getYou(id) {
      if (this.userData.id === id) return "(You)";
    },
    writeMessage: function () {
      if (this.message.content) {
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
          this.allMessages = data;
        })
        .catch(() => {
          this.errorMsg = "Failed to Load , Please Try again .";
        });
    },
    editMsg(msg) {
      this.message = msg;
      this.editing = true;
    },
    showReplyField(id) {
      const target = document.getElementById(id);
      target.classList.toggle("show");
    },
    getReplyValue(id) {
      const target = document.getElementById(id);
      const value = target.children[0].value;
      if (value) target.children[0].value = "";
      return value;
    },
    replyToMsg(msg) {
      this.showReplyField(msg.id);
      const value = this.getReplyValue(msg.id);
      if (value) {
        const newReplies = [
          ...msg.replies,
          {
            id: Date.now(),
            creator: this.userData.name,
            user_id: this.userData.id,
            content: value,
          },
        ];
        const newMsg = { ...msg, replies: newReplies };
        setData("messages" + "/" + msg.id, "PUT", JSON.stringify(newMsg)).then(
          () => {
            this.getMsgs();
          }
        );
      }
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
    signOut() {
      this.$emit("signOut");
    },
  },
};
</script>
<style>
.all__msgs {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
.message header {
  display: grid;
  grid-template-columns: 1fr 6rem;
  gap: 1rem;
}
.msg__btns {
  display: flex;
  justify-self: flex-end;
  justify-content: space-between;
  width: 80%;
  margin: 0.5rem auto;
}

.msg__btns button {
  margin-left: 0.3rem;
  padding: 0.2rem 0.6rem;
  border-radius: 5px;
  background: none;
}
.msg__btns .delete__btn {
  color: red;
}
.msg__btns .edit__btn {
  color: blue;
}
/* Start */
.write__message {
  width: 50%;
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
  gap: 0.5rem;
  margin: 1rem 0;
}
.user__data h4 span {
  font-weight: 600;
}
.user__data button {
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
  width: 50%;
  margin: 1rem auto;
}
.message {
  padding: 0.6rem;
  border: 1px solid rgb(195, 195, 195);
  border-radius: 10px;
  margin-bottom: 0.6rem;
  background: #fff;
}
.reply__wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
}
.reply__wrapper {
  width: 70%;
  margin: auto;
}

.reply__field {
  width: 100%;
  display: none;
}
.reply__field.show {
  display: block;
}
.message h4 {
  font-weight: 600;
}
.message p:not(.post__content) {
  padding-left: 0.4rem;
}
.replies {
  width: 90%;
  margin: 0.3rem auto;
}
.replies div {
  background: #f0f2f5;
  padding: 0.6rem;
  border-radius: 10px;
  margin-top: 0.4rem;
}
.replies div span {
  font-weight: 600;
}
</style>
