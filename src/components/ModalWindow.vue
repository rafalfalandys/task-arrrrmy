<template>
  <div class="wrapper">
    <h2 class="header">{{ details.name }}</h2>
    <progress-spinner v-if="isLoading" class="spinner"></progress-spinner>
    <div v-else>
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
    </div>
    <h4>Galleria:</h4>
    <galleria :value="allImgs" container-class="galleria">
      <template #item="slotProps">
        <img :src="slotProps.item" :alt="details.name" style="width: 30%" />
      </template>
      <template #thumbnail="slotProps">
        <img :src="slotProps.item" :alt="details.name" class="thumbnail" />
      </template>
    </galleria>
  </div>
</template>

<script lang="ts">
import { useApi } from '@/api'
import type { EvolvesTo, PokemonDetails } from '@/types'
import { Galleria, ProgressSpinner } from 'primevue'

export default {
  props: ['details'],
  components: { Galleria, ProgressSpinner },
  data() {
    return {
      api: useApi(),
      evolutions: [] as string[],
      locations: [] as string[],
      isLoading: true,
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
    const { speciesUrl, areasUrl } = this.details as PokemonDetails

    const [evolutions, locations] = await Promise.all([
      this.api.fetchEvolutions(speciesUrl),
      this.api.fetchAreas(areasUrl),
    ])
    this.isLoading = false

    this.buildEvolutionsArr([evolutions.chain])
    if (locations) this.locations = locations.map((el) => el.replaceAll('-', ' '))
  },
}
</script>

<style scoped>
.wrapper {
  border-color: rgb(40, 40, 40);
  color: white;
  width: 400px;
}
.header {
  text-transform: capitalize;
  text-align: center;
}
.galleria {
  max-width: 400px;
  border-color: rgb(20, 20, 20);
}
.list-item {
  text-transform: capitalize;
}
.spinner {
  width: 100%;
}

@media only screen and (max-width: 500px) {
  .wrapper {
    width: auto;
  }
  .galleria {
    max-width: 300px;
  }
}
@media only screen and (max-width: 350px) {
  .galleria {
    max-width: 220px;
  }
}
</style>
