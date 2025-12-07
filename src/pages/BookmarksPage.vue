<template>
  <div class="main-container">Bookmarks Page</div>
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

<style></style>
