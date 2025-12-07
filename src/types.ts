export interface PokemonTypeResponse {
  results: { name: string }[]
}

export interface PokemonType {
  name: string
  isActive: boolean
}

export interface PokemonTypeDetails {
  name: string
  pokemon: { pokemon: { name: string } }[]
}

export interface PokemonDetailsResponse {
  name: string
  id: number
  types: { type: { name: string } }[]
  sprites: { [key: string]: string }
  species: { url: string }
  location_area_encounters: string
}

export type PokemonDetails = {
  name: string
  id: number
  img: string
  types: string[]
  sprites: string[] | { [key: string]: string }[]
  speciesUrl: string
  areasUrl: string
}

export interface EvolvesTo {
  evolves_to: EvolvesTo[]
  species: { name: string }
}

export interface EvolutionsResponse {
  chain: EvolvesTo
}

export interface EncountersResponseEntry {
  location_area: { name: string }
}
