<template>
<div class="home">
  <div class="header">
    <h1>My Posts</h1>
  </div>
  <input v-model="username" placeholder="Your Username...">
  <ImageList :images="filtered_images" />
  <footer>
      Photos all taken by me :). Code for this website can be found on my <a href="https://github.com/lexidelorey/creative-project-4-lexi-delorey">Github</a>
  </footer>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import ImageList from '../components/ImageList.vue'

export default {
  name: 'PostView',
  components: {
    ImageList
  },
  data() {
    return {
      images: [],
      username: ""
    }
  },
  computed: {
    filtered_images() {
      let items = this.images.filter(item => item.username.toLowerCase() == this.username.toLowerCase());
      return items;
    }
  },
  created() {
    this.username = "";
    this.getItems();
  },
  methods: {
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
.image h2 {
  font-style: italic;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1.5em;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 100%;
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

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>
