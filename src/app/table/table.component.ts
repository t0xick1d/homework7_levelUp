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
import { selectAllFilter } from '../store/Filters/select';
import { Observable } from 'rxjs';
import { IFilters } from '../store/Filters/reducer';
import { loadFilters, loadFilterSuccess } from '../store/Filters/action';

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
  filters$: Observable<FilterConfig[]>;
  public dataSource: Product[] = [];
  public filterDataSource: Product[] | undefined = undefined;
  public dataFilter: FilterConfig[] = [];
  public displayedColumns: string[] = [];
  public selectedValue: string | undefined = '';
  public selectedFilter: string | undefined = undefined;
  public activeSelectedCategori: FilterOption[] | undefined = undefined;

  constructor(
    public dialog: MatDialog,
    private tableService: TableService,
    private store: Store
  ) {
    this.dataFilter = this.dataFilter;
    this.filters$ = this.store.select(selectAllFilter);
  }
  ngOnInit(): void {
    this.displayedColumns = this.configure.map((e) => e.titleColums);
    this.tableService.nGetData();
    this.tableService.productSubject.subscribe((data) => {
      this.dataSource = data;
    });
    this.store.dispatch(loadFilters());
    // console.log(this.filters$);
    // this.filters$.subscribe((v) => {
    //   console.log(v);
    // });
    this.tableService.nGetDataFilter();
    this.tableService.filterSubject.subscribe((data) => {
      this.dataFilter = data;
    });
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
  changeSelect(newValue: any) {
    this.activeSelectedCategori = this.dataFilter.filter(
      (e) => e.name === this.selectedValue
    )[0].options;
  }
  addFilter() {
    if (this.selectedValue === 'category') {
      this.filterDataSource = this.dataSource.filter(
        (e) => e.category === this.selectedFilter
      );
    }
    if (this.selectedValue === 'inStock') {
      this.filterDataSource = this.dataSource.filter((e) => {
        if ('Available' === this.selectedFilter) {
          return e.inStock;
        }
        if ('Out of stock' === this.selectedFilter) {
          return e.inStock === false;
        }
        return false;
      });
    }
    if (this.selectedValue === 'minPrice') {
      this.filterDataSource = [];
      this.filterDataSource.push(
        this.dataSource.reduce(
          (acc, obj) => (obj.price < acc.price ? obj : acc),
          this.dataSource[0]
        )
      );
    }
    if (this.selectedValue === 'maxPrice') {
      this.filterDataSource = [];
      this.filterDataSource.push(
        this.dataSource.reduce(
          (acc, obj) => (obj.price > acc.price ? obj : acc),
          this.dataSource[0]
        )
      );
    }
    if (this.selectedValue === 'priceRange') {
      const str: string | undefined = this.selectedFilter;
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
      this.filterDataSource = this.dataSource.filter((e) => {
        if (numbers.length === 1) {
          return e.price > numbers[0];
        }
        return e.price > numbers[0] && e.price < numbers[1];
      });
    }
  }
  resetFilter(): void {
    this.filterDataSource = undefined;
    this.selectedValue = undefined;
    this.selectedFilter = undefined;
    this.activeSelectedCategori = undefined;
  }
}
