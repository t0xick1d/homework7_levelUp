import { filterReducer } from './Filters/reducer';
import { FilterEffects } from './Filters/effects';

export const store = {
  products: filterReducer,
};

export const effects = [FilterEffects];
