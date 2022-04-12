<template>
<div>
  <div class="header">
    <h1>Search Images</h1>
  </div>
  <div class="wrapper">
    <div class="search">
      <form>
        <input v-model="searchText"/>
      </form>
    </div>
    <div class="menu">
      <ul class="menu-list">
        <li class="menu-item"><a @click="select('WA')" href="#" class="menu-link">Washington</a></li>
        <li class="menu-item"><a @click="select('FL')" href="#" class="menu-link">Florida</a></li>
        <li class="menu-item"><a @click="select('WY')" href="#" class="menu-link">Wyoming</a></li>
        <li class="menu-item"><a @click="select('UT')" href="#" class="menu-link">Utah</a></li>
        <li class="menu-item"><a @click="select('')" href="#" class="menu-link">Reset Filters</a></li>
      </ul>
    </div>
  </div>
  <ImageList :images="search_images" />
  <footer>
      Photos all taken by me :). Code for this website can be found on my <a href="https://github.com/lexidelorey/creative-project-4-lexi-delorey">Github</a>
  </footer>
</div>
</template>

<script>
import axios from 'axios';
import ImageList from '../components/ImageList.vue'

export default {
  name: 'SearchView',
  components: {
    ImageList
  },
  data() {
    return {
      searchText: '',
      state: '',
      images: []
    }
  },
  computed: {
    search_images() {
      if (this.state !== '') {
        let countryFilteredImages = this.images.filter(image => image.location === this.state);
        if (this.searchText !== '') {
          return countryFilteredImages.filter(image => image.name.toLowerCase().search(this.searchText.toLowerCase()) >= 0);
        } else {
          return countryFilteredImages;
        }
      } else if (this.searchText !== '') {
        return this.images.filter(image => image.name.toLowerCase().search(this.searchText.toLowerCase()) >= 0);
      } else {
        return [];
      }
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    select(state) {
      this.state = state;
    },
    async getItems() {
      try {
        let response = await axios.get("/api/images");
        this.images = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.search {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
}
form {
  display: table;
  width: 99.3%;
}
i {
  display: table-cell;
  padding-left: 10px;
  width: 1px;
}
input {
  display: table-cell;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
}
.menu {
  margin: 10px;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

li {
  float: left;
}

li a {
  display: block;
  color: black;
  text-align: center;
  padding: 16px;
  text-decoration: none;
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
