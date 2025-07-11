<template>
  <div class="create-post-container">
    <h2 class="create-post-title">Create New Post</h2>
    <form @submit.prevent="createPost" class="create-post-form">
      <div class="input-group">
        <label for="title" class="input-label">Title</label>
        <input
          type="text"
          id="title"
          v-model="title"
          class="create-post-input"
          placeholder="Enter post title"
          required
        />
      </div>

      <div class="input-group">
        <label for="content" class="input-label">Content</label>
        <textarea
          id="content"
          v-model="content"
          class="create-post-input textarea-field"
          placeholder="Write your post content here..."
          required
        ></textarea>
      </div>

      <button type="submit" class="create-post-button">Publish Post</button>
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
.create-post-container {
  max-width: 600px;
  margin: 80px auto;
  padding: 40px;
  background-color: var(--card-bg-color);
  border-radius: 16px;
  box-shadow: 0 8px 25px var(--shadow-color);
  text-align: center;
  font-family: 'Inter', sans-serif;
  color: var(--text-color);
}

.create-post-title {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 30px;
  color: var(--text-color);
}

.create-post-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  text-align: left;
}

.input-label {
  display: block;
  font-size: 0.9rem;
  color: var(--secondary-text-color);
  margin-bottom: 8px;
}

.create-post-input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid var(--input-border-color);
  border-radius: 8px;
  background-color: var(--input-bg-color);
  color: var(--text-color);
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.create-post-input::placeholder {
  color: var(--input-placeholder-color);
}

.create-post-input:focus {
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 2px var(--primary-blue-shadow-light);
}

.textarea-field {
  min-height: 120px;
  resize: vertical;
}

.create-post-button {
  width: 100%;
  padding: 14px;
  background-color: var(--primary-blue);
  color: #ffffff;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 15px var(--primary-blue-shadow);
  margin-top: 20px;
}

.create-post-button:hover {
  background-color: var(--primary-blue-dark);
  box-shadow: 0 6px 20px var(--primary-blue-shadow-dark);
}

@media (max-width: 600px) {
  .create-post-container {
    margin: 40px 20px;
    padding: 30px;
  }
  .create-post-title {
    font-size: 1.8rem;
  }
  .create-post-button {
    font-size: 1rem;
    padding: 12px;
  }
}
</style>