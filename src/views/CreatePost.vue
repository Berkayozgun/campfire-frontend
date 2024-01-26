<template>
  <div class="create-post">
    <h2 class="page-title">Create Post</h2>
    <form @submit.prevent="createPost">
      <label for="title" class="input-label">Title:</label>
      <input
        type="text"
        id="title"
        v-model="title"
        class="input-field"
        required
      />

      <label for="content" class="input-label">Content:</label>
      <input id="content" v-model="content" class="input-field" required />

      <button type="submit" class="submit-button">Create Post</button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      title: "",
      content: "",
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    async createPost() {
      // Kullanıcı oturum bilgilerini Vuex store'dan al
      const token = this.token;

      if (!token) {
        alert("You must be logged in to create a post");
        this.$router.push("/login");
        return;
      }

      const postData = {
        title: this.title,
        content: this.content,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await this.$axios.post(
          "http://127.0.0.1:5000/create_post",
          postData,
          config
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);

        // check user is logged in
        if (!this.$store.state.user) {
          alert("You must be logged in to create a post");
          this.$router.push("/login");
          return;
        }
      }
    },
  },
};
</script>

<style src="../styles/CreatePost.css" scoped></style>
