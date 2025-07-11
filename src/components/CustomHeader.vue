<template>
  <header class="app-header">
    <div class="app-header__container">
      <div class="app-header__left">
        <div class="app-header__logo">
          <span class="app-header__logo-icon">𝕏</span>
          <span class="app-header__logo-text">Campfire</span>
        </div>

        <nav class="app-header__nav">
          <ul class="app-header__nav-links">
            <li v-if="isLoggedIn">
              <router-link class="app-header__nav-link" to="/">Home</router-link>
            </li>
            <li v-if="isLoggedIn">
              <router-link class="app-header__nav-link" to="/newpost">New Post</router-link>
            </li>
            <li v-if="!isLoggedIn">
              <router-link class="app-header__nav-link" to="/login">Login</router-link>
            </li>
            <li v-if="!isLoggedIn">
              <router-link class="app-header__nav-link" to="/register">Register</router-link>
            </li>
          </ul>
        </nav>
      </div>

      <div class="app-header__center">
        <div class="app-header__search">
          <input type="text" placeholder="Search Campfire" class="app-header__search-input" />
          <span class="app-header__search-icon">🔍</span>
        </div>
      </div>

      <div class="app-header__right">
        <button class="app-header__theme-toggle" @click="toggleTheme">
          {{ isDarkMode ? '☀️' : '🌙' }}
        </button>
        <div class="app-header__user-actions" v-if="isLoggedIn">
          <div class="app-header__user-info">
            <div class="app-header__avatar">
              <img :src="avatar" alt="Avatar" />
            </div>
            <div class="app-header__user-data">
              <p class="app-header__username">{{ username }}</p>
              <p class="app-header__user-handle">@{{ username }}</p>
            </div>
          </div>
          <button class="app-header__logout-button" @click="logout">Logout</button>
        </div>
        <button v-if="isLoggedIn" class="app-header__post-button" @click="$router.push('/newpost')">
          Post
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { mockLogout } from "@/mocks/mockApi";
import { mapState, mapActions } from 'vuex';

export default {
  name: "TwitterHeader",
  computed: {
    ...mapState(['isDarkMode']),
    user() {
      return this.$store.state.user;
    },
    isLoggedIn() {
      return !!this.user && !!this.user.username;
    },
    username() {
      return this.user ? this.user.username : "Guest";
    },
    avatar() {
      return this.user && this.user.profile_image_url
        ? this.user.profile_image_url
        : "https://picsum.photos/300";
    },
  },
  methods: {
    ...mapActions(['toggleDarkMode']),
    async logout() {
      try {
        await mockLogout();
        this.$store.dispatch("logout");
        this.$router.push("/login");
      } catch (error) {
        console.log("Logout error:", error);
        alert("Logout failed (mock)");
      }
    },
    toggleTheme() {
      this.toggleDarkMode();
    },
  },
  mounted() {
    // Sayfa yüklendiğinde localStorage'dan kullanıcı bilgilerini al
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { username, token, profile_image_url } = JSON.parse(storedUser);
      // Eğer localStorage'da kullanıcı bilgileri varsa, store'daki bilgileri güncelle
      this.$store.dispatch("setUser", { username, token, profile_image_url });
    }
  },
};
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 60px; /* Slightly smaller height */
  background-color: var(--card-bg-color); /* Use CSS variable */
  color: var(--text-color); /* Use CSS variable */
  box-shadow: 0 2px 10px var(--shadow-color); /* Darker shadow */
  display: flex;
  align-items: center;
  font-family: 'Inter', sans-serif;
  transition: background-color 0.3s, color 0.3s, box-shadow 0.2s;
}

.app-header__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  max-width: 1300px; /* Wider container */
  margin: 0 auto;
  width: 100%;
  padding: 0 20px;
}

.app-header__left,
.app-header__right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.app-header__center {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}

.app-header__logo {
  display: flex;
  align-items: center;
  gap: 5px;
}

.app-header__logo-icon {
  font-size: 1.8rem; /* X logo size */
  color: var(--text-color); /* Use CSS variable */
}

.app-header__logo-text {
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: var(--text-color); /* Use CSS variable */
}

.app-header__nav-links {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
  gap: 15px;
}

.app-header__nav-link {
  color: var(--text-color); /* Use CSS variable */
  font-size: 0.95rem;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
  display: flex;
  align-items: center;
}

.app-header__nav-link:hover {
  background-color: var(--border-color); /* Use CSS variable */
}

.app-header__nav-link.router-link-exact-active {
  color: var(--primary-blue); /* X blue for active link */
}

.app-header__search {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.app-header__search-input {
  width: 100%;
  padding: 8px 15px 8px 40px; /* Space for icon */
  border-radius: 20px;
  border: 1px solid var(--border-color); /* Use CSS variable */
  background-color: var(--input-bg-color); /* Darker background for input */
  color: var(--text-color); /* Use CSS variable */
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s;
}

.app-header__search-input::placeholder {
  color: var(--input-placeholder-color); /* Use CSS variable */
}

.app-header__search-input:focus {
  border-color: var(--primary-blue); /* X blue on focus */
}

.app-header__search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--input-placeholder-color); /* Use CSS variable */
  font-size: 1rem;
}

.app-header__user-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.app-header__user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.app-header__avatar {
  width: 36px; /* Smaller avatar */
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
}

.app-header__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.app-header__user-data {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.app-header__username {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-color); /* Use CSS variable */
  margin-bottom: 0;
}

.app-header__user-handle {
  font-size: 0.75rem;
  color: var(--secondary-text-color); /* Use CSS variable */
}

.app-header__logout-button {
  background-color: #e0245e; /* Red for logout */
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 6px 15px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.app-header__logout-button:hover {
  background-color: #c2185b;
}

.app-header__post-button {
  background-color: var(--primary-blue); /* X blue */
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 8px 18px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s;
}

.app-header__post-button:hover {
  background-color: var(--primary-blue-dark);
}

.app-header__theme-toggle {
  background-color: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-color);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.app-header__theme-toggle:hover {
  background-color: var(--border-color);
}

@media (max-width: 1024px) {
  .app-header__logo-text {
    display: none;
  }
  .app-header__nav-links {
    gap: 10px;
  }
  .app-header__nav-link {
    padding: 5px 8px;
  }
  .app-header__search {
    max-width: 300px;
  }
}

@media (max-width: 768px) {
  .app-header__nav {
    display: none; /* Hide main nav on smaller screens */
  }
  .app-header__user-data {
    display: none; /* Hide username/handle */
  }
  .app-header__search {
    max-width: 250px;
  }
  .app-header__logout-button {
    padding: 6px 10px;
  }
  .app-header__post-button {
    padding: 8px 12px;
  }
}

@media (max-width: 600px) {
  .app-header__container {
    padding: 0 10px;
  }
  .app-header__search {
    max-width: 180px; /* Even smaller search on mobile */
  }
  .app-header__logo-icon {
    font-size: 1.5rem;
  }
  .app-header__user-actions {
    gap: 5px;
  }
  .app-header__logout-button,
  .app-header__post-button {
    font-size: 0.8rem;
    padding: 5px 8px;
  }
}
</style>