<template>
  <div class="home-view">
    <h2>Latest Posts</h2>
    <div class="post-list">
      <PostCard v-for="post in posts" :key="post.postId" :post="post" class="custom-post-card" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PostCard from "@/components/PostCard.vue";

export default {
  components: {
    PostCard,
  },
  name: 'HomeView',
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    axios
      .get("http://127.0.0.1:5000/all_posts")
      .then((response) => {
        this.posts = response.data.posts;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style src="../styles/HomeView.css" scoped></style>
