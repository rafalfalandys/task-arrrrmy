<template>
  <div class="main-container">
    <the-search-box></the-search-box>
    <the-filters :pokemonsTypes="pokemonsStore.pokemonsTypes"></the-filters>
    <the-pokemon-list :pokemons="pokemonsStore.pagedList"></the-pokemon-list>
    <prime-button rounded @click="pokemonsStore.loadMorePokemons" class="button"
      >Load More</prime-button
    >
  </div>
</template>

<script lang="ts">
import { useApi } from '@/api'
import TheFilters from '@/components/TheFilters.vue'
import ThePokemonList from '@/components/PokemonsList.vue'
import TheSearchBox from '@/components/TheSearchBox.vue'
import { usePokemonsStore } from '@/stores/pokemonsStore'
import PrimeButton from 'primevue/button'

export default {
  components: { TheFilters, TheSearchBox, ThePokemonList, PrimeButton },
  data() {
    return {
      pokemonsStore: usePokemonsStore(),
      api: useApi(),
    }
  },
  computed: {},
  watch: {
    'pokemonsStore.activeTypes': {
      handler() {
        this.api.fetchPokemons()
      },
      deep: true,
      immediate: false,
    },
  },
}
</script>

<style scoped>
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
</style>
