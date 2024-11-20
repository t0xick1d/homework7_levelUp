import { filterReducer } from './Filters/reducer';
import { FilterEffects } from './Filters/effects';
import { TableEffects } from './tableData/effects';
import { tableReducer } from './tableData/reducer';

export const store = {
  filters: filterReducer,
  tableData: tableReducer,
};

export const effects = [FilterEffects, TableEffects];
