<template>
  <div class="post-card">
    <div class="author-info">
      <div class="card-start">
        <div class="author-image">
          <img :src="getProfileImage(post)" alt="Profile Image" />
        </div>
        <div class="post-author">{{ post.author.username }}</div>
      </div>
      <div class="post-date">{{ formatDate(post.date) }}</div>
    </div>
    <div class="post-title">{{ post.title }}</div>
    <div class="post-content">{{ post.content }}</div>
    <div class="post-actions">
      <div class="vote-container">
        <button class="vote-button up" @click="handleVoteClick('upvote', clickedPostId)" title="Upvote">
          ▲
        </button>
        <span class="vote-count">{{ post.upvotes || 0 }}</span>
        <button class="vote-button down" @click="handleVoteClick('downvote', clickedPostId)" title="Downvote">
          ▼
        </button>
        <span class="vote-count">{{ post.downvotes || 0 }}</span>
      </div>
      <div class="post-comments">
        <button class="show-comments-button" @click="toggleComments(post)" title="Show Comments">
          💬
        </button>
        <span class="comment-count">{{ getCommentCount(post) }}</span>
      </div>
    </div>
    <transition name="fade">
      <div v-if="post.showComments" class="comments-section">
        <h3>Comments</h3>
        <ul v-if="post.comments && post.comments.length > 0">
          <li v-for="comment in post.comments" :key="comment.comment_id">
            <strong>{{ comment.user }}</strong>: {{ comment.comment }}
          </li>
        </ul>
        <div class="add-comment-area">
          <textarea v-model="newComment" placeholder="Add a comment"></textarea>
          <button class="add-comment-btn" @click="addComment(post)">Add Comment</button>
        </div>
        <p v-if="!post.comments || post.comments.length === 0">No comments available.</p>
      </div>
    </transition>
  </div>
</template>

<script>
import { mockVote, mockAddComment } from "@/mocks/mockApi";
export default {
  data() {
    return {
      clickedPostId: null,
      upvotes: 0,
      downvotes: 0,
      newComment: "",
    };
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("en-US", options);
    },
    getProfileImage(post) {
      if (post.author === "John Doe") {
        return "https://xsgames.co/randomusers/avatar.php?g=male";
      } else if (post.author === "Jane Doe") {
        return "https://xsgames.co/randomusers/avatar.php?g=female";
      } else {
        return "https://picsum.photos/100";
      }
    },

    async handleVoteClick(voteType) {
      const postId = this.post._id;
      const userId = this.$store.state.user ? this.$store.state.user.username : null;
      this.logVoteInfo(voteType, postId);
      if (!postId) {
        console.error("Post ID is undefined.");
        return;
      }
      if (!userId) {
        alert("User not logged in.");
        this.$router.push("/login");
        return;
      }
      try {
        await mockVote({ postId, user: userId, voteType });
        if (voteType === "upvote") {
          this.$set(this.post, "upvotes", (this.post.upvotes || 0) + 1);
          this.$set(this.post, "votes", (this.post.votes || 0) + 1);
        } else if (voteType === "downvote") {
          this.$set(this.post, "downvotes", (this.post.downvotes || 0) + 1);
          this.$set(this.post, "votes", (this.post.votes || 0) - 1);
        }
        alert("Vote registered (mock)");
      } catch (error) {
        alert("Voting request failed (mock)");
      }
    },
    logVoteInfo(voteType) {
      console.log("Voting for Post ID", this.post._id, "with type", voteType); // Use the correct parameters
    },

    getCommentCount(post) {
      return post.comments ? post.comments.length : 0;
    },
    toggleComments(post) {
      if (typeof post.showComments === "undefined") {
        this.$set(post, "showComments", true);
      } else {
        post.showComments = !post.showComments;
      }
    },
    async addComment(post) {
      if (!this.newComment.trim()) {
        alert("Please enter a comment.");
        return;
      }
      const userId = this.$store.state.user ? this.$store.state.user.username : null;
      if (!userId) {
        alert("Please log in to add a comment.");
        this.$router.push("/login");
        return;
      }
      try {
        const response = await mockAddComment({ postId: post._id, user: userId, comment: this.newComment });
        if (!post.comments) {
          this.$set(post, "comments", []);
        }
        post.comments.push({
          user: userId,
          comment: this.newComment,
          comment_id: response.comment_id,
        });
        this.newComment = "";
        alert("Comment added (mock)");
      } catch (error) {
        alert("Comment submission failed (mock)");
      }
    },
  },
};
</script>

<style scoped>
.post-card {
  width: 100%; /* Allow card to fill grid cell */
  border-radius: 18px;
  overflow: hidden;
  padding: 28px 28px 18px 28px;
  display: flex;
  flex-direction: column;
  background: var(--card-bg-color); /* Use CSS variable */
  box-shadow: 0 6px 20px var(--shadow-color); /* Slightly enhanced shadow */
  border: 1px solid var(--border-color); /* Use CSS variable */
  transition: box-shadow 0.2s, border 0.2s, background-color 0.3s;
}
.post-card:hover {
  box-shadow: 0 10px 30px var(--primary-blue-shadow); /* Stronger hover shadow */
  border: 1.5px solid var(--primary-blue); /* Use CSS variable */
}

.author-info {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.card-start {
  display: flex;
  align-items: center;
  gap: 10px;
}
.author-image {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 2px 8px var(--shadow-color);
}
.author-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.post-author {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--primary-blue); /* Use CSS variable */
  letter-spacing: -0.5px;
}
.post-date {
  font-size: 0.95rem;
  color: var(--secondary-text-color); /* Use CSS variable */
  background: var(--input-bg-color); /* Use CSS variable */
  padding: 4px 12px;
  border-radius: 12px;
}
.post-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-color); /* Use CSS variable */
  margin: 8px 0 2px 0;
  letter-spacing: -0.5px;
}
.post-content {
  font-size: 1.08rem;
  color: var(--text-color); /* Use CSS variable */
  margin-bottom: 10px;
  margin-top: 2px;
  line-height: 1.6;
}
.post-actions {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 32px;
  margin-top: 8px;
}
.vote-container {
  display: flex;
  align-items: center;
  gap: 4px;
}
.vote-button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: var(--input-bg-color); /* Use CSS variable */
  color: var(--primary-blue); /* Use CSS variable */
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
  margin: 0 2px;
}
.vote-button.up:hover {
  background: var(--border-color); /* Use CSS variable */
  color: var(--primary-blue-dark); /* Use CSS variable */
}
.vote-button.down {
  color: #e0245e;
}
.vote-button.down:hover {
  background: #ffe8f0;
  color: #c2185b;
}
.vote-count {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-color); /* Use CSS variable */
  margin: 0 4px;
}
.post-comments {
  display: flex;
  align-items: center;
  gap: 4px;
}
.show-comments-button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: var(--input-bg-color); /* Use CSS variable */
  color: var(--primary-blue); /* Use CSS variable */
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
}
.show-comments-button:hover {
  background: var(--border-color); /* Use CSS variable */
  color: var(--primary-blue-dark); /* Use CSS variable */
}
.comment-count {
  font-size: 1rem;
  color: var(--secondary-text-color); /* Use CSS variable */
  margin-left: 2px;
}
.comments-section {
  margin-top: 18px;
  background: var(--input-bg-color); /* Use CSS variable */
  border-radius: 12px;
  padding: 16px 14px 10px 14px;
  box-shadow: 0 2px 8px var(--shadow-color); /* Use CSS variable */
  animation: fadeIn 0.3s;
}
.comments-section h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--primary-blue); /* Use CSS variable */
}
.comments-section ul {
  margin-bottom: 8px;
}
.comments-section li {
  font-size: 0.98rem;
  color: var(--text-color); /* Use CSS variable */
  margin-bottom: 4px;
}
.add-comment-area {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
.add-comment-area textarea {
  flex: 1;
  min-height: 32px;
  border-radius: 8px;
  border: 1px solid var(--border-color); /* Use CSS variable */
  padding: 6px 10px;
  font-size: 1rem;
  resize: vertical;
  background: var(--card-bg-color); /* Use CSS variable */
  transition: border 0.18s;
}
.add-comment-area textarea:focus {
  border: 1.5px solid var(--primary-blue); /* Use CSS variable */
  outline: none;
}
.add-comment-btn {
  background: linear-gradient(90deg, var(--primary-blue) 60%, var(--primary-blue-dark) 100%); /* Use CSS variable */
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s, box-shadow 0.18s;
  box-shadow: 0 2px 8px rgba(29,161,242,0.10);
}
.add-comment-btn:hover {
  background: linear-gradient(90deg, var(--primary-blue-dark) 60%, var(--primary-blue) 100%); /* Use CSS variable */
  box-shadow: 0 4px 16px rgba(29,161,242,0.18);
}
@media (max-width: 700px) {
  .post-card {
    max-width: 98vw;
    padding: 16px 4vw 12px 4vw;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>