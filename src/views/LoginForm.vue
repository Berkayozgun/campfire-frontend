<template>
  <div class="login-container">
    <h1 class="login-title">Sign in to Campfire</h1>
    <form @submit.prevent="login" class="login-form">
      <div class="input-group">
        <label for="username" class="input-label">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          class="login-input"
          placeholder="Enter your username"
          required
        />
      </div>
      <div class="input-group">
        <label for="password" class="input-label">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="login-input"
          placeholder="Enter your password"
          required
        />
      </div>
      <button type="submit" class="login-button">Sign In</button>
    </form>
  </div>
</template>

<script>
import { mockLogin } from "@/mocks/mockApi";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const responseData = await mockLogin({
          username: this.username,
          password: this.password,
        });
        // Update the Vuex store with user information and authentication token
        await this.$store.dispatch("setToken", responseData.access_token);
        await this.$store.dispatch("setUser", {
          username: responseData.username,
          token: responseData.access_token,
        });
        // Log success message
        console.log(
          "Login Successful - Username:",
          this.$store.state.user.username
        );
        // Redirect to the desired page
        this.$router.push("/");
      } catch (error) {
        console.log("Login error:", error);
        alert("Login failed (mock)");
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 80px auto; /* Adjusted margin for better spacing */
  padding: 40px; /* Increased padding */
  background-color: var(--card-bg-color); /* Use CSS variable */
  border-radius: 16px; /* Softer corners */
  box-shadow: 0 8px 25px var(--shadow-color); /* Deeper shadow */
  text-align: center;
  font-family: 'Inter', sans-serif;
  color: var(--text-color); /* Use CSS variable */
}

.login-title {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 30px;
  color: var(--text-color); /* Use CSS variable */
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Space between input groups */
}

.input-group {
  text-align: left;
}

.input-label {
  display: block;
  font-size: 0.9rem;
  color: var(--secondary-text-color); /* Use CSS variable */
  margin-bottom: 8px;
}

.login-input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid var(--input-border-color); /* Use CSS variable */
  border-radius: 8px;
  background-color: var(--input-bg-color); /* Use CSS variable */
  color: var(--text-color); /* Use CSS variable */
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.login-input::placeholder {
  color: var(--input-placeholder-color); /* Use CSS variable */
}

.login-input:focus {
  border-color: var(--primary-blue); /* Use CSS variable */
  box-shadow: 0 0 0 2px var(--primary-blue-shadow-light); /* Subtle glow */
}

.login-button {
  width: 100%;
  padding: 14px;
  background-color: var(--primary-blue); /* Use CSS variable */
  color: #ffffff;
  border: none;
  border-radius: 25px; /* More rounded button */
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 15px var(--primary-blue-shadow); /* Use CSS variable */
}

.login-button:hover {
  background-color: var(--primary-blue-dark); /* Use CSS variable */
  box-shadow: 0 6px 20px var(--primary-blue-shadow-dark); /* Use CSS variable */
}

@media (max-width: 600px) {
  .login-container {
    margin: 40px 20px;
    padding: 30px;
  }
  .login-title {
    font-size: 1.8rem;
  }
  .login-button {
    font-size: 1rem;
    padding: 12px;
  }
}
</style>
