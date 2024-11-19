import { createReducer, on } from '@ngrx/store';
import { FilterConfig, FilterOption } from '../../interface/table.interface';
import { loadFilterSuccess, setActiveCategories } from './action';

export interface SelectFilterI {
  path: string;
  categoriaes: string | undefined;
  activeCategories: FilterOption | undefined;
}

export interface IFilters {
  filters: FilterConfig[];
  setFilters: SelectFilterI[];
}

export const initialState: IFilters = {
  filters: [],
  setFilters: [],
};

export const filterReducer = createReducer(
  initialState,
  on(loadFilterSuccess, (state, { filters }) => {
    return {
      ...state,
      filters,
    };
  }),
  on(setActiveCategories, (state, { setCategories }) => {
    const findPath = state.setFilters.findIndex(
      (e) => e.path === setCategories.path
    );
    if (findPath !== -1) {
      const newSetFilter = [...state.setFilters];
      if (setCategories.activeCategories === undefined) {
        newSetFilter[findPath] = setCategories;
        newSetFilter[findPath].activeCategories = undefined;
      }
      newSetFilter[findPath] = setCategories;
      return {
        ...state,
        setFilters: [...newSetFilter],
      };
    }
    return {
      ...state,
      setFilters: [...state.setFilters, setCategories],
    };
  })
);
