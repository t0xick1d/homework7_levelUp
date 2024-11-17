import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IFilters } from './reducer';

export const selectFilterState = createFeatureSelector<IFilters>('filters');

export const selectAllFilter = createSelector(
  selectFilterState,
  (state: IFilters) => {
    // console.log(state);
    return state.filters;
  }
);
