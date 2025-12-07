<template>
  <h2 v-if="pokemons.length === 0" class="note">You have no favorite Pokemons</h2>
  <pokemons-list :pokemons="pokemons"></pokemons-list>
</template>

<script lang="ts">
import PokemonsList from '@/components/PokemonsList.vue'
import { getLocalBookmarks } from '@/helper'

export default {
  components: { PokemonsList },
  data() {
    return {
      pokemons: getLocalBookmarks(),
    }
  },
  mounted() {},
}
</script>

<style scoped>
.note {
  text-align: center;
  color: white;
}
</style>
