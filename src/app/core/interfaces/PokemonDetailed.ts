export type Stats =
  | 'hp'
  | 'attack'
  | 'defense'
  | 'special-attack'
  | 'special-defense'
  | 'speed';

export interface PokemonDetailed {
  height: number; // Decimetres
  weight: number; // Hectograms
  stats: Record<Stats, number>;
}
