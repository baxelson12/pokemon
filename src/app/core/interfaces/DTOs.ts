export interface ResultDTO {
  count: number;
  next: string;
  previous?: string;
  results: PokemonDTO[];
}

export interface PokemonDTO {
  name: string;
  url: string;
}

export interface PokemonDetailDTO {
  height: number;
  weight: number;
  stats: PokemonStatDTO[];
  name: string;
  id: number;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
}

export interface PokemonStatDTO {
  base_stat: number;
  stat: { name: string };
}
