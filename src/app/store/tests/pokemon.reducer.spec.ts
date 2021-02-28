import * as fromReducer from '../reducers/pokemon.reducer';
import * as actions from '../actions/pokemon.actions';
import { PokemonBase } from '../../core/interfaces/PokemonBase';

const mockPokemon: PokemonBase = {
  id: 1,
  name: 'Bulbasaur',
  type: 'Grass'
};

describe('PokemonReducer', () => {
  describe('Load Pokemon Action', () => {
    it('Should show loading when loading', () => {
      const { initial } = fromReducer;
      const action = actions.loadPokemon();
      const state = fromReducer.reducer(initial, action);
      expect(state.loading).toBe(true);
    });
    it('Should show loaded on complete', () => {
      const { initial } = fromReducer;
      const action = actions.loadPokemonSuccess({ pokemon: [] });
      const state = fromReducer.reducer(initial, action);
      expect(state.loading).toBe(false);
      expect(state.loaded).toBe(true);
    });
    it('Should show not loaded on fail', () => {
      const { initial } = fromReducer;
      const action = actions.loadPokemonFail();
      const state = fromReducer.reducer(initial, action);
      expect(state.loaded).toBe(false);
      expect(state.loading).toBe(false);
    });
    it('Should have one Pokemon', () => {
      const { initial } = fromReducer;
      const action = actions.loadPokemonSuccess({ pokemon: [mockPokemon] });
      const state = fromReducer.reducer(initial, action);
      expect(state.ids.length).toBe(1);
      expect(state.entities[1]).toEqual(mockPokemon);
    });
  });
});
