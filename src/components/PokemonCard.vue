<template>
  <div class="card__container" :style="{ background: colors }" @click="toggleModal">
    <prime-image :src="details.img" :alt="details.name"></prime-image>
    <div>{{ name }}</div>
    <div>#{{ (details.id + '').padStart(3, '0') }}</div>
    <div class="types__wrapper">
      <div class="types" v-for="el in details.types" :key="el">{{ el }}</div>
    </div>
  </div>
  <prime-dialog v-model:visible="modalVisible"
    ><the-modal :details="details"></the-modal
  ></prime-dialog>
</template>

<script lang="ts">
import type { PokemonDetails } from '@/types'
import PrimeDialog from 'primevue/dialog'
import PrimeImage from 'primevue/image'
import { colors } from '@/config'
import TheModal from './TheModal.vue'
import { useApi } from '@/api'

export default {
  components: { PrimeImage, PrimeDialog, TheModal },
  props: ['name'],
  data() {
    return {
      details: {} as PokemonDetails,
      colors: 'grey',
      modalVisible: false,
      api: useApi(),
    }
  },
  methods: {
    toggleModal() {
      this.modalVisible = !this.modalVisible
    },
  },

  async mounted() {
    const details = await this.api.fetchDetails(this.name)
    this.details = details

    // build inline style for card color
    const colorsArr = details.types.map((el) => colors[el])
    this.colors = `linear-gradient(90deg, ${colorsArr.join(', ')})`
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
  color: white;
}
.card__container:hover {
  transform: translateY(-5px);
}
.types__wrapper {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
.types {
  background-color: rgba(255, 255, 255, 0.205);
  padding: 8px 16px;
  border-radius: 50px;
}
</style>
