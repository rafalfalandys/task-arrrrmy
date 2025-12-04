<template>
  <pokemon-card v-for="el in pokemonsStore.pagedList" :key="el" :name="el"></pokemon-card>
  <prime-button @click="pokemonsStore.loadMorePokemons">Load more</prime-button>
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
  computed: {},
  watch: {},
  methods: {},
}
</script>

<style scoped></style>
