import { usePokemonsStore } from './stores/pokemonsStore'
import type { PokemonDetailsResponse, PokemonTypeDetails, PokemonTypeResponse } from './types'

export const useApi = () => {
  const pokemonsStore = usePokemonsStore()

  const fetchTypes = async () => {
    try {
      const res = await fetch('https://pokeapi.co/api/v2/type/?offset=0&limit=100000')

      if (!res.ok) throw new Error('Fetch types issue')

      const data: PokemonTypeResponse = await res.json()
      const typesList = data.results.map((el) => el.name)
      pokemonsStore.setPokemonsTypes(typesList)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchPokemons = async () => {
    try {
      const typesRequests = pokemonsStore.activeTypes.map((typeName) => {
        return fetch(`https://pokeapi.co/api/v2/type/${typeName}/`)
      })
      const res = await Promise.all(typesRequests)

      if (res.some((el) => !el.ok)) throw new Error('Fetch pokemons issue')

      const data: PokemonTypeDetails[] = await Promise.all(res.map((el) => el.json()))
      const allPokemonsNames = data.flatMap((el) =>
        el.pokemon.map((pokemon) => pokemon.pokemon.name),
      )
      const uniquePokemonsNames = Array.from(new Set(allPokemonsNames))

      pokemonsStore.setFilteredPokemons(uniquePokemonsNames)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchDetails = async (pokemonName: string) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

    if (!res.ok) throw new Error('Problem with fetching pokemon details')

    const data: PokemonDetailsResponse = await res.json()
    const details = {
      name: data.name,
      id: data.id,
      types: data.types.map((el) => el.type.name),
      img: data.sprites['front_default'] || '',
    }

    return details
  }

  const fetchEvolutions = async (pokemonId: string) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${pokemonId}`)
      if (!res.ok) throw new Error('Fetch evolutions issue')
      const data = await res.json()

      return data
    } catch (error) {
      console.error(error)
    }
  }

  return { fetchTypes, fetchPokemons, fetchDetails, fetchEvolutions }
}
