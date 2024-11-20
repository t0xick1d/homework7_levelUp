import { Component, OnInit } from '@angular/core';
import { TableService } from './table.service';
import {
  ConfigTable,
  FilterConfig,
  FilterOption,
  Product,
} from '../interface/table.interface';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditAddComponent } from '../component/model/modal-edit-add/modal-edit-add.component';
import { ModalEditComponent } from '../component/model/modal-edit/modal-edit.component';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NameComponent } from '../component/tableComponents/name/name.component';
import { CommonModule } from '@angular/common';
import { TableModule } from './table.module';
import { SkuComponent } from '../component/tableComponents/sku/sku.component';
import { PriceComponent } from '../component/tableComponents/price/price.component';
import { CountryComponent } from '../component/tableComponents/country/country.component';
import { TagsComponent } from '../component/tableComponents/tags/tags.component';
import { ActionComponent } from '../component/tableComponents/action/action.component';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { selectAllTable, selectFilterTable } from '../store/tableData/select';
import {
  filterTable,
  loadTableData,
  resetFilterTable,
} from '../store/tableData/action';
import { selectActiveFilter } from '../store/Filters/select';
import { activeFilterI } from '../store/Filters/reducer';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    TableModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  public configure: ConfigTable[] = [
    {
      titleColums: 'name',
      component: NameComponent,
    },
    {
      titleColums: 'sku',
      component: SkuComponent,
    },
    {
      titleColums: 'price',
      component: PriceComponent,
    },

    {
      titleColums: 'country',
      component: CountryComponent,
    },
    {
      titleColums: 'tags',
      component: TagsComponent,
    },
    {
      titleColums: 'actions',
      component: ActionComponent,
    },
  ];
  tables$: Observable<Product[]>;
  tablesFilter$: Observable<Product[]>;
  activeFilter$: Observable<activeFilterI[]>;
  public displayedColumns: string[] = [];
  public showFilterData: boolean = false;
  public activeSelectedCategori: FilterOption[] | undefined = undefined;

  constructor(
    public dialog: MatDialog,
    private tableService: TableService,
    private store: Store,
    private router: Router
  ) {
    this.tables$ = this.store.select(selectAllTable);
    this.tablesFilter$ = this.store.select(selectFilterTable);
    this.activeFilter$ = this.store.select(selectActiveFilter);
  }
  ngOnInit(): void {
    this.store.dispatch(loadTableData());
    this.tables$.subscribe((e) => {
      this.activeFilter$.subscribe((e) => {
        const obj = e.find((e) => e.route === this.router.url);
        if (obj) {
          this.store.dispatch(filterTable({ filter: obj }));
        } else {
          this.store.dispatch(resetFilterTable());
        }
      });
    });
    this.tablesFilter$.subscribe((e) => {
      if (e.length !== 0) {
        this.showFilterData = true;
      }
      if (e.length === 0) {
        this.showFilterData = false;
      }
    });
    this.displayedColumns = this.configure.map((e) => e.titleColums);
  }
  openEditCtegories(element: Product): void {
    const dialogRef = this.dialog.open(ModalEditComponent, {
      data: { categories: 1, item: { ...element } },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalEditAddComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  clear(): void {
    this.tableService.productSubject.next([]);
  }
}
