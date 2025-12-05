<template>
  <div class="main-container">
    <the-header></the-header>
    <the-search-box></the-search-box>
    <the-filters :pokemonsTypes="pokemonsStore.pokemonsTypes"></the-filters>
    <the-pokemon-list></the-pokemon-list>
  </div>
</template>

<script lang="ts">
import TheFilters from './components/TheFilters.vue'
import TheHeader from './components/TheHeader.vue'
import ThePokemonList from './components/ThePokemonList.vue'
import TheSearchBox from './components/TheSearchBox.vue'
import { usePokemonsStore } from './stores/pokemonsStore'
import type { PokemonTypeDetails, PokemonTypeResponse } from './types'

export default {
  components: { TheHeader, TheFilters, TheSearchBox, ThePokemonList },
  data() {
    return {
      pokemonsStore: usePokemonsStore(),
    }
  },
  computed: {},
  watch: {
    'pokemonsStore.activeTypes': {
      handler() {
        this.fetchPokemons()
      },
      deep: true,
      immediate: false,
    },
  },
  methods: {
    async fetchTypes() {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/type/?offset=0&limit=100000')
        if (!res.ok) throw new Error('Fetch types issue')
        const data: PokemonTypeResponse = await res.json()
        const typesList = data.results.map((el) => el.name)
        this.pokemonsStore.setPokemonsTypes(typesList)
      } catch (error) {
        console.error(error)
      }
    },
    async fetchPokemons() {
      try {
        const typesRequests = this.pokemonsStore.activeTypes.map((typeName) => {
          return fetch(`https://pokeapi.co/api/v2/type/${typeName}/`)
        })
        const res = await Promise.all(typesRequests)

        if (res.some((el) => !el.ok)) throw new Error('Fetch pokemons issue')

        const data: PokemonTypeDetails[] = await Promise.all(res.map((el) => el.json()))
        const allPokemonsNames = data.flatMap((el) =>
          el.pokemon.map((pokemon) => pokemon.pokemon.name),
        )
        const uniquePokemonsNames = Array.from(new Set(allPokemonsNames))

        this.pokemonsStore.setFilteredPokemons(uniquePokemonsNames)
      } catch (error) {
        console.error(error)
      }
    },
  },
  mounted() {
    this.fetchTypes()
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
