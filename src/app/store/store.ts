import { filterReducer } from './Filters/reducer';
import { FilterEffects } from './Filters/effects';

export const store = {
  filters: filterReducer,
};

export const effects = [FilterEffects];
