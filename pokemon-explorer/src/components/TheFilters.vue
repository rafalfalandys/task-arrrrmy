<template>
  <ul class="list">
    <li v-for="el in pokemonsTypes" :key="el.name">
      <button
        :style="{ backgroundColor: colors[el.name] }"
        @click="flipIsActive(el)"
        :class="{ active: el.isActive }"
        class="button"
        rounded
      >
        {{ el.name }}
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { usePokemonsStore } from '@/stores/pokemonsStore'
import type { PokemonType } from '@/types'
import type { PropType } from 'vue'
import { colors } from '@/config'

export default {
  data() {
    return {
      pokemonsStore: usePokemonsStore(),
      colors,
    }
  },
  props: {
    pokemonsTypes: {
      type: Array as PropType<PokemonType[]>,
      required: true,
    },
  },
  methods: {
    flipIsActive(el: PokemonType) {
      this.pokemonsStore.setActiveType(el.name, !el.isActive)
    },
  },
}
</script>

<style scoped>
.list {
  display: flex;
  gap: 5px;
  list-style: none;
}
.button {
  border-radius: 50px;
  padding: 5px 10px;
  font-size: 1rem;
  color: white;
  background-color: gray;
  border: solid 3px rgb(20, 20, 20);
  transform: scale(1);
  transition: all 0.2s;
}
.button:hover {
  transform: translateY(-2px);
}
.active {
  border-color: rgb(220, 220, 220);
}
</style>
