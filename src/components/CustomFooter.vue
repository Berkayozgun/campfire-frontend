<template>
  <footer class="app-footer">
    <div class="app-footer__container">
      <div class="app-footer__section app-footer__section--about">
        <h3 class="app-footer__heading">Campfire</h3>
        <p class="app-footer__text">
          Connecting minds, sharing stories. Join our community today!
        </p>
      </div>

      <div class="app-footer__section app-footer__section--nav">
        <h3 class="app-footer__heading">Quick Links</h3>
        <ul class="app-footer__nav-links">
          <li><router-link to="/" class="app-footer__link">Home</router-link></li>
          <li><router-link to="/about" class="app-footer__link">About</router-link></li>
          <li><router-link to="/login" class="app-footer__link">Login</router-link></li>
          <li><router-link to="/register" class="app-footer__link">Register</router-link></li>
        </ul>
      </div>

      <div class="app-footer__section app-footer__section--social">
        <h3 class="app-footer__heading">Connect With Us</h3>
        <div class="app-footer__social-icons">
          <a href="#" class="app-footer__social-icon" aria-label="Twitter"><i class="fab fa-twitter"></i>🐦</a>
          <a href="#" class="app-footer__social-icon" aria-label="Instagram"><i class="fab fa-instagram"></i>📸</a>
          <a href="#" class="app-footer__social-icon" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i>🔗</a>
        </div>
      </div>
    </div>
    <div class="app-footer__bottom">
      <p class="app-footer__text--copyright">&copy; {{ currentYear }} Campfire. All rights reserved.</p>
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
  padding: 40px 0 20px 0; /* Adjusted padding */
  font-family: 'Inter', sans-serif;
  text-align: center;
  margin-top: auto; /* Pushes the footer to the bottom */
  transition: background-color 0.3s, color 0.3s; /* Add transition for smooth theme change */
  border-top: 1px solid var(--border-color); /* Subtle top border */
}

.app-footer__container {
  max-width: 1200px;
  margin: 0 auto 30px auto; /* Adjusted margin */
  display: flex;
  justify-content: space-around; /* Distribute sections evenly */
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
  gap: 30px; /* Gap between sections */
  padding: 0 20px;
}

.app-footer__section {
  flex: 1; /* Allow sections to grow */
  min-width: 200px; /* Minimum width for sections */
  text-align: left;
}

.app-footer__heading {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary-blue); /* Use primary blue for headings */
  margin-bottom: 15px;
}

.app-footer__text {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--secondary-text-color);
}

.app-footer__nav-links {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.app-footer__nav-links li {
  margin-bottom: 8px;
}

.app-footer__link {
  color: var(--text-color);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

.app-footer__link:hover {
  color: var(--primary-blue);
}

.app-footer__social-icons {
  display: flex;
  gap: 15px;
  margin-top: 10px;
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

.app-footer__bottom {
  border-top: 1px solid var(--border-color); /* Separator line */
  padding-top: 20px;
  margin-top: 20px;
}

.app-footer__text--copyright {
  font-size: 0.85rem;
  color: var(--secondary-text-color);
  margin: 0;
}

@media (max-width: 768px) {
  .app-footer__container {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 40px;
  }
  .app-footer__section {
    min-width: unset;
    width: 100%;
  }
  .app-footer__social-icons {
    justify-content: center;
  }
}
</style>
