<template>
  <div class="home-view">
    <div class="home-header">
      <div class="welcome-area">
        <h1 class="main-title">Campfire</h1>
        <p class="subtitle">Welcome{{ username ? ', ' + username : '' }}! Discover the latest posts below.</p>
      </div>
      <button v-if="isLoggedIn" class="new-post-btn" @click="$router.push('/newpost')">
        + New Post
      </button>
    </div>
    <div class="post-list">
      <PostCard v-for="post in posts" :key="post._id" :post="post" />
    </div>
  </div>
</template>

<script>
import { mockGetPosts } from "@/mocks/mockApi";
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
  computed: {
    user() {
      return this.$store.state.user;
    },
    isLoggedIn() {
      return !!this.user && !!this.user.username;
    },
    username() {
      return this.user ? this.user.username : '';
    },
  },
  async mounted() {
    try {
      const response = await mockGetPosts();
      this.posts = response.posts;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
/* HomeView.vue */

.home-view {
  font-family: "Inter", sans-serif; /* Updated font to Inter */
  color: #14171a;
  background: linear-gradient(120deg, #f0f2f5 60%, #e6efff 100%); /* Lighter, more modern gradient */
  min-height: 100vh;
  width: 100%;
  padding-bottom: 32px;
}

.home-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 700px; /* Adjusted max-width for single column layout */
  margin: 0 auto 24px auto; /* Adjusted margin */
  padding: 40px 32px 16px 32px; /* Adjusted padding */
  gap: 24px;
}
.welcome-area {
  display: flex;
  flex-direction: column;
  gap: 8px; /* Increased gap */
}
.main-title {
  font-size: 2.8rem; /* Larger title */
  font-weight: 900;
  color: #1da1f2;
  margin-bottom: 4px;
  letter-spacing: -1.5px;
}
.subtitle {
  font-size: 1.2rem; /* Slightly larger subtitle */
  color: #657786;
  margin-bottom: 0;
}
.new-post-btn {
  background: linear-gradient(90deg, #1da1f2 60%, #1991da 100%);
  color: #fff;
  border: none;
  border-radius: 100px;
  padding: 14px 32px; /* Larger padding */
  font-size: 1.15rem; /* Slightly larger font */
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(29,161,242,0.20); /* Stronger shadow */
  transition: background 0.2s, box-shadow 0.2s;
}
.new-post-btn:hover {
  background: linear-gradient(90deg, #1991da 60%, #1da1f2 100%);
  box-shadow: 0 6px 20px rgba(29,161,242,0.28);
}

.post-list {
  display: flex; /* Changed to Flexbox */
  flex-direction: column; /* Stack items vertically */
  align-items: center; /* Center items horizontally */
  gap: 24px; /* Gap between posts */
  width: 100%;
  max-width: 700px; /* Adjusted max-width for single column layout */
  margin: 0 auto;
  padding: 0 32px; /* Added padding */
}

@media (max-width: 900px) {
  .home-header, .post-list {
    max-width: 98vw;
    padding: 0 16px;
  }
  .main-title {
    font-size: 2rem;
  }
  .new-post-btn {
    padding: 12px 24px;
    font-size: 1.05rem;
  }
}
@media (max-width: 600px) {
  .home-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 24px 16px 8px 16px;
  }
  .main-title {
    font-size: 1.5rem;
  }
  .post-list {
    padding: 0 16px;
  }
}
</style>

