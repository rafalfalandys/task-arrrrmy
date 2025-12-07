<template>
  <div class="list">
    <pokemon-card v-for="el in pokemons" :key="el" :name="el"></pokemon-card>
  </div>
</template>

<script lang="ts">
import PokemonCard from './PokemonCard.vue'

export default {
  components: { PokemonCard },
  props: ['pokemons'],
}
</script>

<style scoped>
.list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

@media only screen and (max-width: 700px) {
  .list {
    grid-template-columns: 1fr 1fr;
  }
}

@media only screen and (max-width: 500px) {
  .list {
    grid-template-columns: 1fr;
  }
}
</style>
