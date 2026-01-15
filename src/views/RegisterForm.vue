<template>
  <div class="register-container">
    <h1 class="register-title">Create your Campfire account</h1>
    <form @submit.prevent="registerUser" class="register-form">
      <div class="input-group">
        <label for="username" class="input-label">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          class="register-input"
          placeholder="Choose a username"
          required
        />
      </div>

      <div class="input-group">
        <label for="email" class="input-label">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="register-input"
          placeholder="Enter your email"
          required
        />
      </div>

      <div class="input-group">
        <label for="password" class="input-label">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="register-input"
          placeholder="Create a password"
          required
        />
      </div>

      <div class="input-group">
        <label for="name" class="input-label">Name</label>
        <input
          type="text"
          id="name"
          v-model="name"
          class="register-input"
          placeholder="Your first name"
          required
        />
      </div>

      <div class="input-group">
        <label for="surname" class="input-label">Surname</label>
        <input
          type="text"
          id="surname"
          v-model="surname"
          class="register-input"
          placeholder="Your last name"
          required
        />
      </div>

      <div class="input-group">
        <label for="birthdate" class="input-label">Birthdate</label>
        <input
          type="date"
          id="birthdate"
          v-model="birthdate"
          class="register-input"
          required
        />
      </div>

      <div class="input-group">
        <label for="gender" class="input-label">Gender</label>
        <select id="gender" v-model="gender" class="register-input" required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div class="input-group">
        <label for="profileImageUrl" class="input-label">Profile Image URL</label>
        <input
          type="text"
          id="profile_image_url"
          v-model="profile_image_url"
          class="register-input"
          placeholder="URL for your profile picture"
          required
        />
      </div>

      <button type="submit" class="register-button">Sign Up</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      name: "",
      surname: "",
      birthdate: "",
      gender: "",
      profile_image_url: "",
    };
  },
  methods: {
    async registerUser() {
      const userData = {
        username: this.username,
        email: this.email,
        password: this.password,
        name: this.name,
        surname: this.surname,
        birthdate: this.birthdate,
        gender: this.gender,
        profile_image_url: this.profile_image_url,
      };
      try {
        await this.$store.dispatch("register", userData);
        alert("Registration successful!");
        this.$router.push("/");
      } catch (error) {
        console.error("Register component error:", error);
        const errorMsg = error.response && error.response.data && error.response.data.message 
          ? error.response.data.message 
          : "Registration failed. Please try again.";
        alert(errorMsg);
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  max-width: 500px; /* Slightly wider for more inputs */
  margin: 40px auto; /* Adjusted margin */
  padding: 40px; /* Increased padding */
  background-color: var(--card-bg-color); /* Use CSS variable */
  border-radius: 16px;
  box-shadow: 0 8px 25px var(--shadow-color);
  text-align: center;
  font-family: 'Inter', sans-serif;
  color: var(--text-color);
}

.register-title {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 30px;
  color: var(--text-color);
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 15px; /* Space between input groups */
}

.input-group {
  text-align: left;
}

.input-label {
  display: block;
  font-size: 0.9rem;
  color: var(--secondary-text-color);
  margin-bottom: 8px;
}

.register-input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid var(--input-border-color);
  border-radius: 8px;
  background-color: var(--input-bg-color);
  color: var(--text-color);
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.register-input::placeholder {
  color: var(--input-placeholder-color);
}

.register-input:focus {
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 2px var(--primary-blue-shadow-light);
}

.register-button {
  width: 100%;
  padding: 14px;
  background-color: var(--primary-blue);
  color: #ffffff;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 15px var(--primary-blue-shadow);
  margin-top: 20px; /* Space above button */
}

.register-button:hover {
  background-color: var(--primary-blue-dark);
  box-shadow: 0 6px 20px var(--primary-blue-shadow-dark);
}

@media (max-width: 600px) {
  .register-container {
    margin: 20px 15px;
    padding: 25px;
  }
  .register-title {
    font-size: 1.8rem;
  }
  .register-button {
    font-size: 1rem;
    padding: 12px;
  }
}
</style>
