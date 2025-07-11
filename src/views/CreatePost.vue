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
import { mockCreatePost } from "@/mocks/mockApi";

export default {
  data() {
    return {
      title: "",
      content: "",
    };
  },
  computed: {
    ...mapState(["token", "user"]),
  },
  methods: {
    async createPost() {
      const token = this.token;
      if (!token || !this.user) {
        alert("You must be logged in to create a post");
        this.$router.push("/login");
        return;
      }
      const postData = {
        title: this.title,
        content: this.content,
        author: this.user.username,
      };
      try {
        const response = await mockCreatePost(postData);
        console.log(response.post);
        alert("Post created (mock)");
        this.$router.push("/");
      } catch (error) {
        console.error(error);
        alert("Failed to create post (mock)");
      }
    },
  },
};
</script>

<style scoped>
.create-post {
  max-width: 400px;
  margin-top: 100px;
  padding: 20px;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: center;
  background-color: #e1e8ed;
  font-family: "Roboto", sans-serif;
}

.page-title {
  font-size: 24px;
}

.input-label {
  font-size: 16px;
  margin-bottom: 8px;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #45a049;
}
</style>

