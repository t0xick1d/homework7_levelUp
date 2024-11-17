import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TableService } from '../../table/table.service';
import { loadFilters, loadFilterSuccess } from './action';
import { map, mergeMap, switchMap } from 'rxjs';
import { Filter } from '../shared/filter.inerface';

@Injectable()
export class FilterEffects {
  constructor(private action$: Actions, private tableService: TableService) {}

  loadFilter$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadFilters),
      mergeMap(() =>
        this.tableService.nGetDataFilter().pipe(
          map((filters) => {
            return loadFilterSuccess({ filters: filters.body });
          })
        )
      )
    )
  );
}
