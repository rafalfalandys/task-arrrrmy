<template>
  <div class="list">
    <pokemon-card v-for="el in pokemonsStore.pagedList" :key="el" :name="el"></pokemon-card>
  </div>
  <prime-button rounded @click="pokemonsStore.loadMorePokemons" class="button"
    >Load More</prime-button
  >
</template>

<script lang="ts">
import { usePokemonsStore } from '@/stores/pokemonsStore'
import PokemonCard from './PokemonCard.vue'
import PrimeButton from 'primevue/button'

export default {
  components: { PokemonCard, PrimeButton },
  data() {
    return {
      pokemonsStore: usePokemonsStore(),
    }
  },
}
</script>

<style scoped>
.list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}
.button {
  display: block;
  text-align: center;
  margin: auto;
  margin-top: 3rem;
  background-color: rgb(38, 99, 205);
  border-color: rgb(38, 99, 205);
}

.button:hover {
  background-color: rgb(95, 134, 201);
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
