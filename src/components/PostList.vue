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

<style scoped>
.custom-card {
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 16px;
  background-color: #ffffff;
  /* Beyaz arkaplan rengi */
  height: 100%;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}

.card-subtitle {
  font-size: 14px;
  color: #555;
  /* Gri alt başlık rengi */
}

.card-text {
  margin-top: 8px;
}

.card-img-top {
  border-radius: 15px;
  margin-bottom: 8px;
  object-fit: cover;
  /* Kartın içine resmi sığdırma */
  height: 200px;
  /* Kart yüksekliği ayarlanabilir */
}

.like-dislike {
  margin-right: 4px;
}

.text-muted {
  font-size: 12px;
  color: #888;
}
</style>

