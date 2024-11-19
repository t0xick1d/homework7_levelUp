import { createAction, props } from '@ngrx/store';
import { FilterConfig } from '../../interface/table.interface';
import { SelectFilterI } from './reducer';

export const loadFilters = createAction('[Filter] Load Filter');
export const loadFilterSuccess = createAction(
  '[Filter] Filter Success',
  props<{ filters: FilterConfig[] }>()
);
export const setActiveCategories = createAction(
  '[Filter] Set Categorise',
  props<{ setCategories: SelectFilterI }>()
);
