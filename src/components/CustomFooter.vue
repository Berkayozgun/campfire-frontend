<template>
  <footer class="app-footer">
    <div class="app-footer__container">
      <p class="app-footer__text">&copy; {{ currentYear }} Campfire. All rights reserved.</p>
      <div class="app-footer__social-links">
        <a href="#" class="app-footer__social-icon">🐦</a>
        <a href="#" class="app-footer__social-icon">📸</a>
        <a href="#" class="app-footer__social-icon">🔗</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'CustomFooter',
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
.app-footer {
  background-color: #2c3e50; /* Dark background for a modern look */
  color: #ecf0f1;
  padding: 20px 0;
  font-family: 'Inter', sans-serif;
  text-align: center;
  margin-top: auto; /* Pushes the footer to the bottom */
}

.app-footer__container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.app-footer__text {
  font-size: 0.9rem;
  margin: 0;
}

.app-footer__social-links {
  display: flex;
  gap: 15px;
}

.app-footer__social-icon {
  font-size: 1.5rem;
  color: #ecf0f1;
  text-decoration: none;
  transition: color 0.3s ease;
}

.app-footer__social-icon:hover {
  color: #1da1f2; /* Twitter blue for hover */
}

@media (max-width: 768px) {
  .app-footer__container {
    padding: 0 20px;
  }
}
</style>
