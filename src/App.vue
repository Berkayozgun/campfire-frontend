<template>
  <main class="app-root">
    <CustomHeader />
    <div class="custom-app">
      <router-view class="router-view" />


    </div>
  </main>
</template>

<script>
import CustomHeader from './components/CustomHeader.vue';

export default {
  name: 'App',
  components: {
    CustomHeader,
  },
};
</script>

<style scoped>
/* app.css */

.app-root {
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  scroll-behavior: smooth;
}

.custom-app {
  background-color: #fff;
  border-radius: 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.router-body {
  margin-top: 30px;
  width: 100%;
}

.nav-links {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
}

.nav-links li {
  margin-right: 10px;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  padding: 8px 12px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-links a:hover {
  background-color: #ddd;
}

.router-view {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
</style>

