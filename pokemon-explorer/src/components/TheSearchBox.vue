<template>
  <label for="">search</label>
  <input type="text" v-model="pokemonsStore.searchQuery" />
</template>

<script lang="ts">
import { usePokemonsStore } from '@/stores/pokemonsStore'

export default {
  data() {
    return {
      pokemonsStore: usePokemonsStore(),
    }
  },
  computed: {},
  watch: {},
  methods: {
    filterPokemons(name: InputEvent) {
      this.pokemonsStore.setQuery(name.data!)
    },
  },
}
</script>

<style scoped></style>
