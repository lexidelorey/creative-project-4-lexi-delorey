<template>
<div class="create">
  <h1>Sign Up</h1>
  <div class="add">
    <div class="form">
      <input v-model="username" placeholder="Username">
      <p></p>
      <input v-model="password" placeholder="Password">
      <p></p>
      <button @click="signup">Sign Up</button>
    </div>
  </div>
  <footer>
      Photos all taken by me :). Code for this website can be found on my <a href="https://github.com/lexidelorey/creative-project-4-lexi-delorey">Github</a>
  </footer>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'SignupView',
  data() {
    return {
      username: "",
      password: "",
    }
  },
  methods: {
    async signup() {
      try {
        await axios.post('/api/users', {
          username: this.username,
          password: this.password
        });
      } catch (error) {
        this.error = "Something went wrong, please check that your username and password are correct. If you do not have an account, please make one before uploading.";
      }
    },
  }
}
</script>

<style>
footer {
  box-sizing: border-box;
  text-align: center;
  width: 100%;
  margin-top: 20px;
  padding: 50px;
  background-color: #416788;
  color: white;
  font-size: 1em;
  position: absolute;
}
</style>
