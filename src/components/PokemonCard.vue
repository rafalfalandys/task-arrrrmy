<template>
  <div class="container" :style="{ background: colors }">
    <div @click="toggleFavorite">
      <i class="pi pi-bookmark bookmark-icon" v-if="!isFavorite"></i>
      <i class="pi pi-bookmark-fill bookmark-icon" v-if="isFavorite"></i>
    </div>
    <progress-spinner v-if="isLoading" class="spinner"></progress-spinner>
    <div @click="toggleModal" class="content" v-else>
      <prime-image :src="details.img" :alt="details.name"></prime-image>
      <div class="text-wrapper">
        <h3 class="header">{{ name }}</h3>
        <span>#{{ (details.id + '').padStart(3, '0') }}</span>
        <div class="types__wrapper">
          <span class="types" v-for="el in details.types" :key="el">{{ el }}</span>
        </div>
      </div>
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
import TheModal from './ModalWindow.vue'
import { useApi } from '@/api'
import { getLocalBookmarks } from '@/helper'
import { ProgressSpinner } from 'primevue'

export default {
  components: { PrimeImage, PrimeDialog, TheModal, ProgressSpinner },
  props: ['name'],
  data() {
    return {
      details: {} as PokemonDetails,
      colors: 'grey',
      modalVisible: false,
      api: useApi(),
      isFavorite: false,
      isLoading: true,
    }
  },
  methods: {
    toggleModal() {
      this.modalVisible = !this.modalVisible
    },
    toggleFavorite() {
      const currentBookmarks = getLocalBookmarks()

      let updatedBookmarks: string[]

      if (this.isFavorite) {
        updatedBookmarks = currentBookmarks.filter((el: string) => el !== this.name)
        this.isFavorite = false
      } else {
        updatedBookmarks = [...currentBookmarks, this.name]
        this.isFavorite = true
      }

      window.localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))
    },
    checkFavorite() {
      const currentBookmarks = getLocalBookmarks()
      this.isFavorite = currentBookmarks.includes(this.name)
    },
  },

  async mounted() {
    this.checkFavorite()

    const details = await this.api.fetchDetails(this.name)
    this.isLoading = false
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

  min-height: 260px;
  padding: 0;
  position: relative;
  padding: 1rem;
  border-radius: 20px;
  background-color: grey;

  transition: all 0.2s;
  cursor: pointer;
  color: white;
}
.container:hover {
  transform: translateY(-5px);
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.text-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
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
.bookmark-icon {
  position: absolute;
  right: 1.2rem;
  top: 1.2rem;
  transition: all 0.2s;
}
.bookmark-icon:hover {
  transform: scale(1.2);
}
.spinner {
  margin-top: 4rem;
}
@media only screen and (max-width: 500px) {
  .container {
    min-height: 160px;
  }
  .content {
    display: grid;
    grid-template-columns: 40% 1fr;
    width: 100%;
    justify-items: center;
  }
  .spinner {
    margin-top: 1rem;
  }
}
</style>
