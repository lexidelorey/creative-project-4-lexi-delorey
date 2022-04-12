<template>
<div class="wrapper">
  <div class="images">
    <div class="image" v-for="image in images" :key="image.id">
      <div class="image">
        <img :src=image.path>
      </div>
      <div class="like">
        <h1>{{image.caption}}</h1>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ImageList',
  props: {
    images: Array
  },
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.images {
  column-gap: 5px;
  column-fill: initial;
  column-count: 1;
  margin: 20px;
}
.image {
  margin-top: 20px;
  margin-bottom: 10px;
  display: inline-block;
  vertical-align: top;
  margin: 5px;
}
.image img {
  height: 350px;
  width: 300px;
  object-fit: cover;
}
.like {
  display: flex;
  font-size: 10px;
  justify-content: space-between;
  aligh-items: flex-start;
}
.info {
  width: 160px;
}
.auto {
  margin-left: 5px;
}
</style>
