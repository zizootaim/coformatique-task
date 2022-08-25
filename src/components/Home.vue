<template>
  <section>
    <h1 class="title">GuestBook App</h1>
    <div v-if="!logged">
      <div class="btns__wrapper">
        <button
          @click="formType = 'Sign Up'"
          :class="formType === 'Sign Up' ? 'btn active' : 'btn'"
        >
          Sign Up
        </button>
        <button
          @click="formType = 'Sign In'"
          :class="formType === 'Sign In' ? 'btn active' : 'btn'"
        >
          Sign In
        </button>
      </div>
      <Form :formType="formType" v-on:openAccount="logIn" />
    </div>

    <div v-if="logged">
      <UserAccount :userData="user" v-on:signOut="signOut" />
    </div>
  </section>
</template>
<script>
import Form from "./Form.vue";
import UserAccount from "./UserAccount.vue";

export default {
  data() {
    return {
      formType: "Sign Up",
      logged: false,
      user: {},
    };
  },
  components: {
    Form,
    UserAccount,
  },
  mounted() {
    window.location.hash = "";
  },

  methods: {
    signOut() {
      this.user = {};
      this.logged = false;
      window.location.hash = "";
    },
    logIn: function (user) {
      window.location.hash = "user";
      this.user = user;
      this.logged = true;
    },
  },
};
</script>
<style>
.title {
  text-align: center;
}
.btn {
  border-radius: 4px;
  font-weight: 600;
  margin: 0 10px;
  width: 200px;
  padding: 10px 0;
  box-shadow: 0 0 20px rgba(104, 85, 224, 0.2);
  transition: 0.4s;
  color: rgb(104, 85, 224);
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(104, 85, 224, 1);
}
.btn.active {
  color: white;
  background-color: rgba(104, 85, 224, 1);
}
.btn:hover {
  color: white;
  box-shadow: 0 0 20px rgba(104, 85, 224, 0.6);
  background-color: rgba(104, 85, 224, 1);
}
.btns__wrapper {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}
</style>
