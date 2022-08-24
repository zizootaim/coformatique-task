<template>
  <div>
    <h1>{{ formType }}</h1>
    <p class="error" v-if="errorMsg">{{ errorMsg }}</p>
    <form @submit.prevent="submitData">
      <div class="input__field">
        <input
          type="text"
          placeholder="Name"
          v-if="formType == 'Sign Up'"
          v-model="name"
        />
      </div>
      <div class="input__field">
        <input type="email" placeholder="E-mail" v-model="email" />
      </div>
      <div class="input__field">
        <input type="password" placeholder="Password" v-model="password" />
      </div>
      <div class="btns__wrapper">
        <button type="submit" class="btn">Submit</button>
      </div>
    </form>
  </div>
</template>
<script>
import { getData, setData } from "../CommonFunctions";
export default {
  props: ["formType"],
  data() {
    return {
      name: "",
      email: "",
      password: "",
      errorMsg: "",
      users: [],
    };
  },

  methods: {
    submitData() {
      if (this.formType == "Sign In") this.logIn();
      else this.signUp();
    },
    logIn() {
      getData("users")
        .then((data) => {
          data.forEach((user) => {
            const success =
              user.email == this.email && user.password == this.password
                ? true
                : false;
            if (success) {
              this.errorMsg = "";
              this.$emit("openAccount", user);
            } else {
              this.errorMsg = "The user name or password are incorrect .";
            }
          });
        })
        .catch(() => {
          this.errorMsg = "Failed to Load , Please Try again .";
        });
    },
    signUp() {
      const newUser = {
        id: Date.now(),
        name: this.name,
        email: this.email,
        password: this.password,
      };
      setData("users", "POST", JSON.stringify(newUser))
        .then(() => {
          this.email = "";
          this.name = "";
          this.password = "";
        })
        .catch(() => {
          this.errorMsg = "Failed to Sign Up , Please Try again .";
        });
    },
  },
};
</script>
<style scoped>
h1 {
  text-align: center;
}
.error {
  text-align: center;
  color: red;
}
.input__field input {
  width: 100%;
  padding: 10px 0;
  margin: 5px 0;
  border: none;
  border-bottom: 1px solid #999;
  outline: none;
  background: transparent;
}

form {
  width: 40%;
  margin: 2rem auto;
}
</style>
