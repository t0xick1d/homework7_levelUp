import { createAction, props } from '@ngrx/store';
import { Filter } from '../shared/filter.inerface';

export const loadFilters = createAction('[Filter] Load Filter');
export const loadFilterSuccess = createAction(
  '[Filter] Filter Success',
  props<{ filters: Filter[] }>()
);
