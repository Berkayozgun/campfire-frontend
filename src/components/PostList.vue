<template>
  <v-container>
    <h2 class="">Post List</h2>
    <v-row>
      <v-col v-for="post in posts" :key="post._id" cols="12" md="4">
        <v-card class="custom-card">
          <v-img :src="getPostImage(post)" class="card-img-top" alt="Post Image"></v-img>
          <v-card-title>
            <h5 class="card-title">{{ post.title }}</h5>
            <v-subtitle class="card-subtitle text-muted">Author: {{ post.author }}x</v-subtitle>
          </v-card-title>
          <v-card-text>{{ post.content.substring(0, 100) + '...' }}</v-card-text>
          <v-card-actions>
            <small class="text-muted">{{ formatDate(post.date) }}</small>
            <v-btn-group>
              <v-btn @click="upvote(post)" icon>
                <v-icon class="like-dislike">mdi-thumb-up</v-icon>
                <span>{{ post.votes }}</span>
              </v-btn>
              <v-btn @click="downvote(post)" icon>
                <v-icon class="like-dislike">mdi-thumb-down</v-icon>
                <span>{{ post.votes }}</span>
              </v-btn>
            </v-btn-group>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      posts: [],
    };
  },

  methods: {
    // async fetchPosts() {
    //   try {
    //     const response = await axios.get('http://127.0.0.1:5000/all_posts');
    //     this.posts = response.data.posts;
    //   } catch (error) {
    //     console.error('Error fetching posts:', error);
    //   }
    // },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('en-US', options);
    },
    getPostImage(post) {
      if (post.content.includes('Vue.js')) {
        return 'https://picsum.photos/200';
      } else if (post.content.includes('Lorem Ipsum')) {
        return 'https://picsum.photos/200';
      } else {
        return 'https://picsum.photos/200';
      }
    },
  },
};
</script>

<style src="../styles/PostList.css" scoped></style>
