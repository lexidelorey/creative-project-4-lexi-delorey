<template>
<div class="create">
  <h1>Post Management</h1>
  <div class="edit">
    <div class="form">
      <input v-model="searchUsername" placeholder="Username">
      <p></p>
      <div class="upload" v-if="findItem">
        <input v-model="findItem.caption" placeholder="Caption">
        <p></p>
        <img :src="findItem.path" />
      </div>
      <div class="actions" v-if="findItem">
        <button @click="deleteItem(findItem)">Delete</button>
        <button @click="editItem(findItem)">Edit</button>
      </div>
    </div>
  </div>
  <div class="suggestions" v-if="suggestions.length > 0">
    <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.caption}}</div>
  </div>
  <div>
    <p>If nothing shows up, please make sure you typed your username correctly</p>
  </div>
  <div v-if="error">
    <h2>{{this.error}}</h2>
  </div>
  <footer>
      Photos all taken by me :). Code for this website can be found on my <a href="https://github.com/lexidelorey/creative-project-4-lexi-delorey">Github</a>
  </footer>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'PostManagementView',
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
  flex-direction: column;
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
  display: table;
  margin-right: auto;
  margin-left: auto;
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
