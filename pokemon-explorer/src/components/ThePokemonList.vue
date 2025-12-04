<template>
  <pokemon-card v-for="el in pokemonsStore.pagedList" :key="el" :name="el"></pokemon-card>
  <button @click="pokemonsStore.loadMorePokemons">Load more</button>
</template>

<script lang="ts">
import { usePokemonsStore } from '@/stores/pokemonsStore'
import PokemonCard from './PokemonCard.vue'

export default {
  components: { PokemonCard },
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
