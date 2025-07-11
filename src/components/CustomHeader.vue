<template>
  <header class="app-header">
    <div class="app-header__container">
      <div class="app-header__logo">
        <span class="app-header__logo-icon">🔥</span>
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
    </div>
  </header>
</template>

<script>
import { mockLogout } from "@/mocks/mockApi";
export default {
  name: "TwitterHeader",
  computed: {
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
  height: 72px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  font-family: 'Inter', sans-serif;
  transition: box-shadow 0.2s;
}

.app-header__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 32px;
}

.app-header__logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.app-header__logo-icon {
  font-size: 2rem;
  margin-right: 4px;
}

.app-header__logo-text {
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: -1px;
  color: #1a202c;
}

.app-header__nav-links {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
  gap: 8px;
}

.app-header__nav-link {
  color: #4a5568;
  font-size: 1rem;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: 100px;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
  display: flex;
  align-items: center;
}

.app-header__nav-link:hover {
  background: #edf2f7;
  color: #1a202c;
}

.app-header__nav-link.router-link-exact-active {
  background: #1da1f2;
  color: #fff;
}

.app-header__user-actions {
  display: flex;
  align-items: center;
  background: #f7fafc;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  border-radius: 32px;
  padding: 4px 16px 4px 8px;
  gap: 12px;
}

.app-header__user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.app-header__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
}

.app-header__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.app-header__user-data {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.app-header__username {
  font-size: 1rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 2px;
}

.app-header__user-handle {
  font-size: 0.85rem;
  color: #657786;
}

.app-header__logout-button {
  background: linear-gradient(90deg, #1da1f2 60%, #1991da 100%);
  color: #fff;
  border: none;
  border-radius: 100px;
  padding: 8px 22px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(29,161,242,0.10);
}

.app-header__logout-button:hover {
  background: linear-gradient(90deg, #1991da 60%, #1da1f2 100%);
  box-shadow: 0 4px 16px rgba(29,161,242,0.18);
}

@media (max-width: 900px) {
  .app-header__container {
    padding: 0 16px;
  }
  .app-header__logo-text {
    display: none;
  }
  .app-header__user-actions {
    padding: 4px 8px 4px 4px;
  }
}

@media (max-width: 600px) {
  .app-header__container {
    flex-direction: row;
    justify-content: space-between;
    padding: 0 16px;
  }
  .app-header__logo-area {
    margin-bottom: 0;
  }
  .app-header__user-actions {
    margin-top: 0;
    width: auto;
  }
  .app-header__nav-links {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-top: 1px solid #e8e8e8;
    justify-content: space-around;
    padding: 8px 0;
    margin: 0;
    z-index: 101;
  }
}
</style>