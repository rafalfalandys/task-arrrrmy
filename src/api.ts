import { usePokemonsStore } from './stores/pokemonsStore'
import type {
  EncountersResponseEntry,
  PokemonDetails,
  PokemonDetailsResponse,
  PokemonTypeDetails,
  PokemonTypeResponse,
} from './types'

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
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      if (!res.ok) throw new Error('Problem with fetching pokemon details')
      const data: PokemonDetailsResponse = await res.json()

      const spritesArr = Object.values(data.sprites).filter((el) => !!el)

      const details: PokemonDetails = {
        name: data.name,
        id: data.id,
        types: data.types.map((el) => el.type.name),
        img: data.sprites['front_default'] || '',
        sprites: spritesArr,
        speciesUrl: data.species.url,
        areasUrl: data.location_area_encounters,
      }

      return details
    } catch (error) {
      console.error(error)
    }
  }

  const fetchEvolutions = async (speciesUrl: string) => {
    try {
      // first see the species data
      const speciesRes = await fetch(speciesUrl)
      if (!speciesRes.ok) throw new Error('Fetch species data issue')
      const speciesData = await speciesRes.json()

      // from species data take the evolution chain url
      const evolutionRes = await fetch(speciesData.evolution_chain.url)
      if (!evolutionRes.ok) throw new Error('Fetch evolutions issue')
      const evolutionData = await evolutionRes.json()

      return evolutionData
    } catch (error) {
      console.error(error)
    }
  }

  const fetchAreas = async (url: string) => {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error('Fetch areas issue')
      const data: EncountersResponseEntry[] = await res.json()

      return data.map((el) => el.location_area.name)
    } catch (error) {
      console.error(error)
    }
  }

  return { fetchTypes, fetchPokemons, fetchDetails, fetchEvolutions, fetchAreas }
}
