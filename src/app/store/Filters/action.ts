import { createAction, props } from '@ngrx/store';
import { FilterConfig } from '../../interface/table.interface';

export const loadFilters = createAction('[Filter] Load Filter');
export const loadFilterSuccess = createAction(
  '[Filter] Filter Success',
  props<{ filters: FilterConfig[] }>()
);
