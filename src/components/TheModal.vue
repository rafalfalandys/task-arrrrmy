<template>
  <div class="wrapper">
    <h2 class="header">{{ details.name }}</h2>
    <div v-if="evolutions.length > 0">
      <h4>Evolves to:</h4>
      <ul>
        <li class="list-item" v-for="el in evolutions" :key="el">{{ el }}</li>
      </ul>
    </div>
    <div v-if="locations.length > 0">
      <h4>Locations:</h4>
      <ul>
        <li class="list-item" v-for="el in locations" :key="el">{{ el }}</li>
      </ul>
    </div>
    <h4>Galleria:</h4>
    <galleria :value="allImgs" container-class="galleria">
      <template #item="slotProps">
        <img :src="slotProps.item" :alt="details.name" style="width: 40%" />
      </template>
      <template #thumbnail="slotProps">
        <img :src="slotProps.item" :alt="details.name" class="thumbnail" />
      </template>
    </galleria>
  </div>
</template>

<script lang="ts">
import { useApi } from '@/api'
import type { EvolutionsResponse, EvolvesTo, PokemonDetails } from '@/types'
import { Galleria } from 'primevue'

export default {
  props: ['details'],
  components: { Galleria },
  data() {
    return {
      api: useApi(),
      evolutions: [] as string[],
      locations: [] as string[],
    }
  },
  computed: {
    allImgs() {
      const details = this.details as PokemonDetails
      return [details.img, ...details.sprites.filter((el) => typeof el === 'string')]
    },
  },
  methods: {
    buildEvolutionsArr(evolutions: EvolvesTo[]) {
      let workArr: EvolvesTo[] = evolutions

      if (workArr.length > 0) {
        this.evolutions.push(workArr[0]?.species.name as string)
        workArr = workArr[0]!.evolves_to
        this.buildEvolutionsArr(workArr)
      }
    },
  },
  async mounted() {
    const evolutions: EvolutionsResponse = await this.api.fetchEvolutions(
      (this.details as PokemonDetails).speciesUrl,
    )
    this.buildEvolutionsArr([evolutions.chain])

    const locations = await this.api.fetchAreas((this.details as PokemonDetails).areasUrl)
    if (locations) this.locations = locations.map((el) => el.replaceAll('-', ' '))
  },
}
</script>

<style scoped>
.wrapper {
  border-color: rgb(40, 40, 40);
  color: white;
}
.header {
  text-transform: capitalize;
  text-align: center;
}
.galleria {
  max-width: 400px;
  border-color: rgb(20, 20, 20);
  /* background-color: red; */
}
.list-item {
  text-transform: capitalize;
}
</style>
