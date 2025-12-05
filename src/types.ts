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
  types: {type: {name: string}}[]
  sprites: { [key: string]: string }
}

export interface PokemonDetails {
  name: string
  id: number
  img: string
  types: string[]
}
