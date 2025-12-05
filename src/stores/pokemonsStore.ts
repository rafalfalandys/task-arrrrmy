import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { PokemonType } from '@/types'

export const usePokemonsStore = defineStore('pokemonsStore', () => {
  const pokemonsTypes: Ref<PokemonType[]> = ref([])
  const pokemonsNames: Ref<string[]> = ref([])
  const filteredPokemons: Ref<string[]> = ref([])
  const pokemonsPerPage: Ref<number> = ref(6)
  const searchQuery: Ref<string> = ref('')

  const activeTypes = computed(() =>
    pokemonsTypes.value.filter((el) => el.isActive).map((el) => el.name),
  )

  const pagedList = computed(() => {
    return filteredPokemons.value
      .filter((el) => el.includes(searchQuery.value))
      .slice(0, pokemonsPerPage.value)
  })

  const setPokemonsTypes = (data: string[]) => {
    pokemonsTypes.value = data.map((el) => {
      return { name: el, isActive: false }
    })
  }

  const setPokemonsNames = (data: string[]) => {
    pokemonsNames.value = data
  }

  const setActiveType = (name: string, isActive: boolean) => {
    const singleType = pokemonsTypes.value.find((el) => el.name === name)
    if (singleType) singleType.isActive = isActive
  }

  const setFilteredPokemons = (data: string[]) => {
    filteredPokemons.value = data
  }
  const setQuery = (query: string) => {
    console.log(query)
    searchQuery.value = query
  }

  const loadMorePokemons = () => {
    pokemonsPerPage.value += 6
  }

  return {
    pokemonsTypes,
    setPokemonsNames,
    setPokemonsTypes,
    setActiveType,
    activeTypes,
    filteredPokemons,
    setFilteredPokemons,
    pagedList,
    setQuery,
    searchQuery,
    loadMorePokemons,
  }
})
