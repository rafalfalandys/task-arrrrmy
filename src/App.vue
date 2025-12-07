<template>
  <the-header></the-header>
  <div class="main-container">
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script lang="ts">
import TheHeader from './components/TheHeader.vue'

export default {
  components: { TheHeader },
}
</script>

<style>
html {
  font-family: Roboto, 'Open Sans', 'Segoe UI', system-ui;
  background-color: rgb(20, 20, 20);
}

.main-container {
  max-width: 1400px;
  margin: auto;
}

.p-galleria-thumbnails > .p-galleria-thumbnails-content {
  background-color: rgb(60, 60, 60);
}
</style>
