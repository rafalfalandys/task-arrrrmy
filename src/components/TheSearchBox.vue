<template>
  <input-text
    class="search-box"
    type="text"
    v-model="pokemonsStore.searchQuery"
    placeholder="Search Pokemon"
    rounded
  />
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
}
</script>

<style scoped>
.search-box {
  background-color: rgb(40, 40, 40);
  border-radius: 50px;
  margin: auto;
  display: block;
  color: white;
  border: none;
  min-width: 50vw;
  padding: 16px;
}
</style>
