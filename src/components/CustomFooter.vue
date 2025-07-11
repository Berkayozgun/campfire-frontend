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
  background-color: var(--card-bg-color); /* Use CSS variable for background */
  color: var(--text-color); /* Use CSS variable for text color */
  padding: 20px 0;
  font-family: 'Inter', sans-serif;
  text-align: center;
  margin-top: auto; /* Pushes the footer to the bottom */
  transition: background-color 0.3s, color 0.3s; /* Add transition for smooth theme change */
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
  color: var(--text-color); /* Use CSS variable for icon color */
  text-decoration: none;
  transition: color 0.3s ease;
}

.app-footer__social-icon:hover {
  color: var(--primary-blue); /* Use CSS variable for hover color */
}

@media (max-width: 768px) {
  .app-footer__container {
    padding: 0 20px;
  }
}
</style>