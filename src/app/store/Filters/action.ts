import { createAction, props } from '@ngrx/store';
import { FilterConfig } from '../../interface/table.interface';
import { activeFilterI } from './reducer';

export const loadFilters = createAction('[Filter] Load Filter');
export const loadFilterSuccess = createAction(
  '[Filter] Filter Success',
  props<{ filters: FilterConfig[] }>()
);
export const setActiveFilter = createAction(
  '[Filter] Set Filter',
  props<{ filter: activeFilterI }>()
);
export const resetActiveFilter = createAction(
  '[Filter] Reset Filter',
  props<{ routes: string }>()
);
