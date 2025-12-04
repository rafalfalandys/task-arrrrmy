<template>
  <figure>
    <image width="200" height="200" :src="details.img"></image>
  </figure>
  <div>{{ name }}</div>
  <div>{{ details.id }}</div>
  <div v-for="el in details.types" :key="el">{{ el }}</div>
  <br />
</template>

<script lang="ts">
import type { PokemonDetails, PokemonDetailsResponse } from '@/types'

export default {
  props: ['name'],
  data() {
    return {
      details: {} as PokemonDetails,
    }
  },
  methods: {
    async fetchDetails() {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.name}`)

      if (!res.ok) throw new Error('Problem with fetching pokemon details')

      const data: PokemonDetailsResponse = await res.json()
      this.details = {
        name: data.name,
        id: data.id,
        types: data.types.map((el) => el.type.name),
        img: data.sprites['front_default'] || '',
      }
      console.log(data)
    },
  },
  mounted() {
    this.fetchDetails()
  },
}
</script>

<style scoped></style>
