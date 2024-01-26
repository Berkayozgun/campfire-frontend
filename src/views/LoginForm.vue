<template>
    <div class="login-form">
        <h1>Login</h1>
        <form @submit.prevent="login">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        async login() {
            try {
                const response = await fetch('http://127.0.0.1:5000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Login Failed");
                }

                const responseData = await response.json();
                console.log('Response Data:', responseData);

                console.clear();

                if (!responseData.username || !responseData.access_token) {
                    throw new Error('Invalid server response format');
                }

                // Update the Vuex store with user information and authentication token
                await this.$store.dispatch('setToken', responseData.access_token);
                await this.$store.dispatch('setUser', { username: responseData.username, access_token: responseData.access_token });

                // Log success message
                console.log('Login Successful - Username:', this.$store.state.user.username);

                // Redirect to the desired page
                this.$router.push('/');
            } catch (error) {
                console.log("Login error:", error);
            }
        },

    },

};
</script>

<style scoped>
.login-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.login-form h1 {
    text-align: center;
}

.login-form form {
    display: flex;
    flex-direction: column;
}

.login-form label {
    margin-bottom: 10px;
}

.login-form input {
    padding: 10px;
    margin-bottom: 20px;
}

.login-form button {
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.login-form button:hover {
    background-color: #0056b3;
}
</style>
