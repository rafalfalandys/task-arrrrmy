<template>
  <prime-image :src="details.img" :alt="details.name" width="300"></prime-image>
  <h2>{{ details.name }}</h2>
</template>

<script lang="ts">
import { useApi } from '@/api'
import type { PokemonDetails } from '@/types'
import PrimeImage from 'primevue/image'

export default {
  props: ['details'],
  components: { PrimeImage },
  data() {
    return {
      detailsPlus: {} as PokemonDetails & { evolutions: string[] },
      api: useApi(),
    }
  },
  methods: {},
  async mounted() {
    const evolutions = await this.api.fetchEvolutions(this.details.id)
    console.log(evolutions)
  },
}
</script>

<style scoped></style>
