<template>
  <div class="container" :style="{ background: colors }" @click="toggleModal">
    <prime-image :src="details.img" :alt="details.name"></prime-image>
    <h3 class="header">{{ name }}</h3>
    <span>#{{ (details.id + '').padStart(3, '0') }}</span>
    <div class="types__wrapper">
      <span class="types" v-for="el in details.types" :key="el">{{ el }}</span>
    </div>
  </div>
  <prime-dialog
    v-model:visible="modalVisible"
    class="modal"
    :style="{ background: 'rgb(40, 40, 40)', borderColor: 'rgb(20, 20, 20)' }"
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
    if (details) {
      this.details = details

      // build inline style for card color
      const colorsArr = details.types.map((el) => colors[el])
      this.colors = `linear-gradient(90deg, ${colorsArr.join(', ')})`
    }
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1rem;
  min-height: 200px;
  border-radius: 20px;
  background-color: grey;

  transition: all 0.2s;
  cursor: pointer;
  color: white;
}
.container:hover {
  transform: translateY(-5px);
}
.header {
  text-transform: capitalize;
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
  text-transform: capitalize;
}
</style>
