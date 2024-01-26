<template>
  <header class="twitter-header">
    <div class="container">
      <nav>
        <ul class="nav-links">
          <li class="home-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="26"
              viewBox="0 0 28 26"
              fill="none"
            >
              <path
                d="M27.225 7.1875L14.5938 0.371252C14.2225 0.171252 13.7763 0.171252 13.4063 0.371252L0.781258 7.1875C0.173758 7.5175 -0.0524924 8.275 0.275008 8.8825C0.500008 9.30125 0.931258 9.53875 1.37501 9.53875C1.57501 9.53875 1.78001 9.49125 1.96876 9.38875L2.88626 8.89375L4.87376 22.9563C5.14376 24.4738 6.51126 25.5338 8.19876 25.5338H19.8013C21.4888 25.5338 22.8563 24.4738 23.1288 22.9238L25.1138 8.8925L26.035 9.39C26.6413 9.71875 27.4 9.4925 27.7275 8.885C28.0563 8.2775 27.8275 7.51875 27.2225 7.19125L27.225 7.1875ZM14 17.2938C11.7563 17.2938 9.93751 15.475 9.93751 13.2313C9.93751 10.9875 11.7563 9.16875 14 9.16875C16.2438 9.16875 18.0625 10.9875 18.0625 13.2313C18.0625 15.475 16.2438 17.2938 14 17.2938Z"
                fill="#fff"
              />
            </svg>
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
