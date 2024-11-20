import { createReducer, on } from '@ngrx/store';
import { Product } from '../../interface/table.interface';
import { filterTable, loadTableDataSuccess, resetFilterTable } from './action';

export interface ITable {
  table: Product[];
  filterTable: Product[];
}

export const initialState: ITable = {
  table: [],
  filterTable: [],
};

export const tableReducer = createReducer(
  initialState,
  on(loadTableDataSuccess, (state, { tables }) => {
    return {
      ...state,
      table: tables,
    };
  }),
  on(filterTable, (state, { filter }) => {
    let newFilterData: Product[] = [];
    if (filter!.filter.type === 'text' && filter!.activeFilter === undefined) {
      const filterDataSource: Product[] = [...state.table];
      if (filter!.filter.name === 'minPrice') {
        newFilterData = [
          ...filterDataSource.sort((ef, es) => ef.price - es.price),
        ];
      }
      if (filter!.filter.name === 'maxPrice') {
        newFilterData = [
          ...filterDataSource.sort((ef, es) => es.price - ef.price),
        ];
      }
    }
    if (
      filter!.filter.name === 'category' &&
      filter!.activeFilter !== undefined
    ) {
      newFilterData = state.table.filter((e) => {
        return e.category === filter!.activeFilter!.name;
      });
    }
    if (
      filter!.filter.name === 'inStock' &&
      filter!.activeFilter !== undefined
    ) {
      newFilterData = state.table.filter((e) => {
        if ('Available' === filter!.activeFilter!.name) {
          return e.inStock;
        }
        if ('Out of stock' === filter!.activeFilter!.name) {
          return e.inStock === false;
        }
        return false;
      });
    }
    if (
      filter!.filter.name === 'priceRange' &&
      filter!.activeFilter !== undefined
    ) {
      const str: string | undefined = filter!.activeFilter.value;
      const numbers: number[] = [];
      let currentNum: string = '';
      if (str !== undefined) {
        for (let i = 0; i < str.length; i++) {
          const char = str[i];
          if (!isNaN(Number(char)) && char !== ' ') {
            currentNum += char;
          } else if (currentNum) {
            numbers.push(parseInt(currentNum, 10));
            currentNum = '';
          }
        }
        if (currentNum) {
          numbers.push(parseInt(currentNum, 10));
        }
      }
      newFilterData = state.table.filter((e) => {
        if (numbers.length === 1) {
          return e.price > numbers[0];
        }
        return e.price > numbers[0] && e.price < numbers[1];
      });
    }

    return {
      ...state,
      filterTable: [...newFilterData],
    };
  }),
  on(resetFilterTable, (state) => {
    return {
      ...state,
      filterTable: [],
    };
  })
);
