<template>
  <div class="header">
    <img class="pokeball" src="/favicon.png" alt="Pokeball" />
    <RouterLink to="/" class="link">
      <h1>Pokémon Explorer</h1>
    </RouterLink>
    <RouterLink to="/bookmarks" class="link">
      <div class="bookmarks-wrapper">
        <i class="pi pi-bookmark icon"></i>
        <span>Bookmarks</span>
      </div>
    </RouterLink>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {}
  },
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}
.header h1 {
  text-align: center;
  background: linear-gradient(90deg, rgb(255, 109, 0), rgb(255, 152, 0));
  background-clip: text;
  color: transparent;
  font-weight: 700;
  font-size: 48px;
}
.link {
  text-decoration: none;
}
.bookmarks-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transition: all 200ms;
}
.bookmarks-wrapper:hover {
  transform: translateY(-5px);
}
.header span {
  color: white;
  font-size: 0.8rem;
}
.pokeball {
  height: 40px;
}
.icon {
  color: white;
  font-size: 1.5rem;
}

@media only screen and (max-width: 580px) {
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    margin-bottom: 1.5rem;
  }
  .header h1 {
    margin-top: 0;
  }
}
</style>
