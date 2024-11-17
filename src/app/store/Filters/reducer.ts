import { createReducer, on } from '@ngrx/store';
import { FilterConfig } from '../../interface/table.interface';
import { loadFilterSuccess } from './action';

export interface IFilters {
  filters: FilterConfig[];
}

export const initialState: IFilters = {
  filters: [],
};

export const filterReducer = createReducer(
  initialState,
  on(loadFilterSuccess, (state, { filters }) => {
    return {
      ...state,
      filters,
    };
  })
);
