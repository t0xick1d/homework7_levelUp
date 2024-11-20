import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TableService } from '../../table/table.service';
import { loadTableData, loadTableDataSuccess } from './action';
import { map, mergeMap} from 'rxjs';

@Injectable()
export class TableEffects {
  constructor(private action$: Actions, private tableService: TableService) {}

  loadFilter$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadTableData),
      mergeMap(() =>
        this.tableService.nGetData().pipe(
          map((table) => {
            return loadTableDataSuccess({ tables: table.body });
          })
        )
      )
    )
  );
}
