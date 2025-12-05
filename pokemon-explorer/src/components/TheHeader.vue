<template>
  <h1 class="header"><img class="icon" src="/favicon.png" alt="Pokeball" />Pokémon Explorer</h1>
</template>

<script lang="ts">
export default {
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
}
</script>

<style scoped>
.header {
  text-align: center;
  background: linear-gradient(90deg, rgb(255, 109, 0), rgb(255, 152, 0));
  background-clip: text;
  color: transparent;
  font-weight: 700;
  font-size: 48px;
}
.icon {
  height: 40px;
  margin-right: 20px;
}

@media only screen and (max-width: 500px) {
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
