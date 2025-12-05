<!-- :style="{ backgroundColor: 'linear-gradient(90deg,#B7B7CE #B6A136) 100%);' }" -->
<template>
  <div class="card__container" :style="{ background: colors }" @click="toggleModal">
    <prime-image :src="details.img" :alt="details.name"></prime-image>
    <div>{{ name }}</div>
    <div>#{{ (details.id + '').padStart(3, '0') }}</div>
    <div v-for="el in details.types" :key="el">{{ el }}</div>
  </div>
  <prime-dialog v-model:visible="modalVisible">The details of {{ name }} coming soon</prime-dialog>
</template>

<script lang="ts">
import type { PokemonDetails, PokemonDetailsResponse } from '@/types'
import PrimeDialog from 'primevue/dialog'
import PrimeImage from 'primevue/image'
import { colors } from '@/config'

export default {
  components: { PrimeImage, PrimeDialog },
  props: ['name'],
  data() {
    return {
      details: {} as PokemonDetails,
      colors: 'grey',
      modalVisible: false,
    }
  },
  methods: {
    async fetchDetails() {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.name}`)

      if (!res.ok) throw new Error('Problem with fetching pokemon details')

      const data: PokemonDetailsResponse = await res.json()
      const details = {
        name: data.name,
        id: data.id,
        types: data.types.map((el) => el.type.name),
        img: data.sprites['front_default'] || '',
      }
      this.details = details

      const colorsArr = details.types.map((el) => colors[el])
      this.colors = `linear-gradient(90deg, ${colorsArr.join(', ')})`
    },
    toggleModal() {
      this.modalVisible = !this.modalVisible
    },
  },
  mounted() {
    this.fetchDetails()
  },
}
</script>

<style scoped>
.card__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: grey;
  border-radius: 20px;
  min-height: 200px;
  transition: all 0.2s;
  cursor: pointer;
}
.card__container:hover {
  transform: translateY(-5px);
}
</style>
