import * as fromReducer from '../reducers/detail.reducer';
import * as actions from '../actions/detail.actions';

const mockDetails: Omit<fromReducer.State, 'loading' | 'loaded'> = {
  id: 1,
  name: 'Bulbasaur',
  height: 10,
  weight: 150,
  type: 'Grass',
  stats: {
    attack: 10,
    defense: 10,
    hp: 10,
    'special-attack': 10,
    'special-defense': 10,
    speed: 10
  }
};

describe('DetailReducer', () => {
  describe('Load Detail Action', () => {
    it('Should show loading when loading', () => {
      const { initial } = fromReducer;
      const action = actions.loadDetails({ id: 1 });
      const state = fromReducer.reducer(initial, action);
      expect(state.loading).toBe(true);
    });
    it('Should show loaded on complete', () => {
      const { initial } = fromReducer;
      const action = actions.loadDetailsSuccess({ details: mockDetails });
      const state = fromReducer.reducer(initial, action);
      expect(state.loading).toBe(false);
      expect(state.loaded).toBe(true);
    });
    it('Should show not loaded on fail', () => {
      const { initial } = fromReducer;
      const action = actions.loadDetailsFail();
      const state = fromReducer.reducer(initial, action);
      expect(state.loaded).toBe(false);
      expect(state.loading).toBe(false);
    });
    it('Should contain given details', () => {
      const { initial } = fromReducer;
      const action = actions.loadDetailsSuccess({ details: mockDetails });
      const state = fromReducer.reducer(initial, action);
      expect(state).toEqual({ ...mockDetails, loaded: true, loading: false });
    });
  });
});
