import { createReducer, on } from '@ngrx/store';
import { FilterConfig, FilterOption } from '../../interface/table.interface';
import {
  loadFilterSuccess,
  resetActiveFilter,
  setActiveFilter,
} from './action';
import { Router } from '@angular/router';

export interface activeFilterI {
  route: string;
  filter: FilterConfig;
  activeFilter?: FilterOption;
}

export interface IFilters {
  filters: FilterConfig[];
  activeFilter: activeFilterI[];
}

export const initialState: IFilters = {
  filters: [],
  activeFilter: [],
};

export const filterReducer = createReducer(
  initialState,
  on(loadFilterSuccess, (state, { filters }) => {
    return {
      ...state,
      filters,
    };
  }),
  on(setActiveFilter, (state, { filter }) => {
    const updateFilters = state.activeFilter.filter(
      (e) => e.route !== filter.route
    );
    return {
      ...state,
      activeFilter: [...updateFilters, filter],
    };
  }),
  on(resetActiveFilter, (state, { routes }) => {
    const updateFilters = state.activeFilter.filter((e) => e.route !== routes);
    return {
      ...state,
      activeFilter: [...updateFilters],
    };
  })
);
