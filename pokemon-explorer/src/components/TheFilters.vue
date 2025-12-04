<template>
  <span>Filters</span>
  <ul class="list">
    <li v-for="el in pokemonsTypes" :key="el.name">
      <button @click="flipIsActive(el)" :class="{ active: el.isActive }">{{ el.name }}</button>
    </li>
  </ul>
</template>

<script lang="ts">
import { usePokemonsStore } from '@/stores/pokemonsStore'
import type { PokemonType } from '@/types'
import type { PropType } from 'vue'

export default {
  data() {
    return {
      pokemonsStore: usePokemonsStore(),
    }
  },
  props: {
    pokemonsTypes: {
      type: Array as PropType<PokemonType[]>,
      required: true,
    },
  },
  computed: {},
  watch: {},
  methods: {
    flipIsActive(el: PokemonType) {
      this.pokemonsStore.setActiveType(el.name, !el.isActive)
    },
  },
}
</script>

<style scoped>
.active {
  background-color: red;
}
.list {
  display: flex;
}
</style>
