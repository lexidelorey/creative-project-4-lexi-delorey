<template>
<div class="create">
  <h1>Create a Post</h1>
  <div class="add">
    <div class="form">
      <input v-model="username" placeholder="Username">
      <p></p>
      <input v-model="password" placeholder="Password">
      <p></p>
      <input v-model="location" placeholder="State Taken In (ex: WA)">
      <p></p>
      <textarea v-model="caption" placeholder="Caption"></textarea>
      <p></p>
      <input type="file" name="photo" @change="fileChanged">
      <button @click="upload">Upload</button>
    </div>
  </div>
  <h2>{{this.error}}</h2>
  <footer>
      Photos all taken by me :). Code for this website can be found on my <a href="https://github.com/lexidelorey/creative-project-4-lexi-delorey">Github</a>
  </footer>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'CreateView',
  data() {
    return {
      caption: "",
      username: "",
      password: "",
      file: null,
      items: [],
      searchUsername: "",
      findItem: null,
      error: "",
      location: "",
    }
  },
  computed: {
    suggestions() {
      let items = this.items.filter(item => item.username.toLowerCase() == this.searchUsername);
      return items
    }
  },
  created() {
    this.error = '';
    this.getItems();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async getItems() {
      try {
        let response = await axios.get("/api/images");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/images', {
          username: this.username,
          path: r1.data.path,
          caption: this.caption,
          location: this.location,
          password: this.password
        });
        this.addItem = r2.data;
        this.error = "Success!";
      } catch (error) {
        this.error = "Something went wrong, please check that your username and password are correct. If you do not have an account, please make one before uploading.";
      }
    },
    selectItem(item) {
      this.searchUsername = "";
      this.findItem = item;
    },
    async deleteItem(item) {
      try {
        await axios.delete("/api/images/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        await axios.put("/api/images/" + item._id, {
          username: this.findItem.username,
          caption: this.findItem.caption,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.add,
.edit {
  display: flex;
  justify-content: center;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

.form {
  float: center;
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

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
