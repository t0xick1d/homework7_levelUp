import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITable } from './reducer';

export const selectTableState = createFeatureSelector<ITable>('tableData');

export const selectAllTable = createSelector(
  selectTableState,
  (state: ITable) => {
    return state.table;
  }
);
export const selectFilterTable = createSelector(
  selectTableState,
  (state: ITable) => {
    return state.filterTable;
  }
);
