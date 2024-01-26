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

<style src="./styles/App.css" scoped></style>
