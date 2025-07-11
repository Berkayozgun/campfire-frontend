<template>
  <div class="about-container">
    <h1 class="about-title">About Campfire</h1>
    <p class="about-text">
      Campfire is a modern social media platform designed for sharing thoughts, ideas, and connecting with a vibrant community.
      Our goal is to provide a clean, intuitive, and engaging experience for all users.
    </p>
    <p class="about-text">
      Built with Vue.js, this project showcases modern web development practices, including component-based architecture,
      responsive design, and a focus on user experience.
    </p>
    <p class="about-text">
      Feel free to explore the features, create posts, and interact with other users.
      We are continuously working to improve and expand Campfire.
    </p>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
};
</script>

<style scoped>
.about-container {
  max-width: 800px;
  margin: 80px auto;
  padding: 40px;
  background-color: #1a1a1a; /* Dark background for X aesthetic */
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
  text-align: center;
  font-family: 'Inter', sans-serif;
  color: #e0e0e0; /* Light text color */
}

.about-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 30px;
  color: #ffffff;
}

.about-text {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #8899a6;
}

@media (max-width: 768px) {
  .about-container {
    margin: 40px 20px;
    padding: 30px;
  }
  .about-title {
    font-size: 2rem;
  }
  .about-text {
    font-size: 1rem;
  }
}
</style>