import { createAction, props } from '@ngrx/store';
import { Product } from '../../interface/table.interface';
import { activeFilterI } from '../Filters/reducer';

export const loadTableData = createAction('[Table] Load Data');
export const loadTableDataSuccess = createAction(
  '[Table] Data Success',
  props<{ tables: Product[] }>()
);
export const filterTable = createAction(
  '[Table] Data Filter',
  props<{ filter: activeFilterI | undefined }>()
);
export const resetFilterTable = createAction('[Table] Data Reset Filter');
