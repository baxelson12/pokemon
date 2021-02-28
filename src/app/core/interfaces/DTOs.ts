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
  stats: PokemonStatDTO;
}

export interface PokemonStatDTO {
  base_stat: number;
  stat: { name: string };
}
