<template>
  <label for="">search</label>
  <input-text type="text" v-model="pokemonsStore.searchQuery" />
</template>

<script lang="ts">
import { usePokemonsStore } from '@/stores/pokemonsStore'
import InputText from 'primevue/inputtext'

export default {
  components: { InputText },
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
