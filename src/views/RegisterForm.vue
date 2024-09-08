<template>
  <div class="register-form">
    <h2>Register</h2>
    <form @submit.prevent="registerUser">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required />

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />

      <label for="name">Name:</label>
      <input type="text" id="name" v-model="name" required />

      <label for="surname">Surname:</label>
      <input type="text" id="surname" v-model="surname" required />

      <label for="birthdate">Birthdate:</label>
      <input type="date" id="birthdate" v-model="birthdate" required />

      <label for="gender">Gender:</label>
      <select id="gender" v-model="gender" required>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <!-- Add more options if needed -->
      </select>

      <label for="profileImageUrl">Profile Image URL:</label>
      <input
        type="text"
        id="profile_image_url"
        v-model="profile_image_url"
        required
      />

      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
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
    registerUser() {
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

      axios
        .post("http://127.0.0.1:5000/register", userData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.register-form {
  max-width: 400px;
  margin: 0 auto;
  margin-top: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  border-radius: 35px;
  font-family: Lato, sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 10px;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border:none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
select {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border:none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
