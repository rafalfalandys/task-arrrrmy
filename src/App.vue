<template>
  <div class="main-container">
    <the-header></the-header>
    <the-search-box></the-search-box>
    <the-filters :pokemonsTypes="pokemonsStore.pokemonsTypes"></the-filters>
    <the-pokemon-list></the-pokemon-list>
  </div>
</template>

<script lang="ts">
import { useApi } from './api'
import TheFilters from './components/TheFilters.vue'
import TheHeader from './components/TheHeader.vue'
import ThePokemonList from './components/ThePokemonList.vue'
import TheSearchBox from './components/TheSearchBox.vue'
import { usePokemonsStore } from './stores/pokemonsStore'

export default {
  components: { TheHeader, TheFilters, TheSearchBox, ThePokemonList },
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

  mounted() {
    this.api.fetchTypes()
  },
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
</style>
