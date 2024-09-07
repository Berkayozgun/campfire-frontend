<template>
  <header class="twitter-header">
    <div class="container">
      <nav>
        <ul class="nav-links">
          <li class="home-link">
            <router-link class="home-text" to="/">Home</router-link>
          </li>

          <li class="new-post-link">
            <router-link class="home-text" to="/newpost">New Post</router-link>
          </li>
          <li class="login-link">
            <router-link class="home-text" to="/login">Login</router-link>
          </li>
          <li class="register-link">
            <router-link class="home-text" to="/register">Register</router-link>
          </li>
        </ul>
      </nav>
      <div class="user-actions">
        <div class="user-info">
          <div class="avatar">
            <img src="https://picsum.photos/300" alt="Avatar" />
          </div>
          <div class="user-data">
            <p class="username">{{ username }}</p>
            <p class="user-bio">@username</p>
          </div>
        </div>
        <button class="logout-button" @click="logout">Logout</button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "TwitterHeader",
  computed: {
    user() {
      return this.$store.state.user;
    },
    username() {
      return this.user ? this.user.username : "Guest";
    },
    avatar() {
      return this.user ? this.user.avatar : "https://picsum.photos/300";
    },
  },
  methods: {
    async logout() {
      try {
        const response = await fetch("http://127.0.0.1:5000/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$store.state.token}`, // Access token'ı buraya ekleyin
          },
          body: JSON.stringify({
            username: this.username,
          }),
        });

        if (!response.ok) {
          console.error(
            "Server responded with:",
            response.status,
            response.statusText
          );
          throw new Error("Logout Failed");
        }
        console.log("Server Response:", response);

        const { username } = await response.json();

        // Kullanıcı adını console'da kontrol et
        console.log("Logout Successful - Username:", username);

        this.$store.dispatch("logout");

        this.$router.push("/login");
      } catch (error) {
        console.log("Logout error:", error);
        if (error.response) {
          console.error(
            "Server responded with:",
            error.response.status,
            error.response.data
          );
        }
      }
    },
  },
  mounted() {
    // Sayfa yüklendiğinde localStorage'dan kullanıcı bilgilerini al
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { username, token } = JSON.parse(storedUser);
      // Eğer localStorage'da kullanıcı bilgileri varsa, store'daki bilgileri güncelle
      this.$store.dispatch("setUser", { username, token });
    }
  },
};
</script>

<style src="../styles/CustomHeader.css" scoped></style>
