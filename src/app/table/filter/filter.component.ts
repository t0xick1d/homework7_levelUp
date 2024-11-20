import { Component, OnInit } from '@angular/core';
import {
  FilterConfig,
  FilterOption,
  Product,
} from '../../interface/table.interface';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TableService } from '../table.service';
import {
  selectActiveFilter,
  selectAllFilter,
} from '../../store/Filters/select';
import {
  loadFilters,
  resetActiveFilter,
  setActiveFilter,
} from '../../store/Filters/action';
import { Observable } from 'rxjs';
import { activeFilterI } from '../../store/Filters/reducer';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnInit {
  public selectedValue: FilterConfig = {
    label: '',
    name: '',
    type: 'text',
  };
  public activeSelectedFilter: FilterOption[] = [];
  public activeSelectedValue: FilterOption = {
    name: '',
    value: '',
  };
  public showActiveFilter: 'text' | 'select' | 'checkbox' = 'text';
  filters$: Observable<FilterConfig[]>;
  activeFilter$: Observable<activeFilterI[]>;
  constructor(private store: Store, private router: Router) {
    this.filters$ = this.store.select(selectAllFilter);
    this.activeFilter$ = this.store.select(selectActiveFilter);
  }
  ngOnInit(): void {
    this.store.dispatch(loadFilters());

    this.activeFilter$.subscribe((e) => {
      const obj = e.find((e) => e.route === this.router.url);
      if (obj) {
        this.changeSelect(obj.filter);
      }
      if (obj?.activeFilter) {
        this.activeSelectedValue = obj.activeFilter;
      }
    });
  }
  changeSelect(filter: FilterConfig): void {
    this.selectedValue = filter;
    this.showActiveFilter = filter.type;
    filter.options ? (this.activeSelectedFilter = filter.options) : '';
  }
  changeActiveSelect(activeFilter: FilterOption): void {
    this.activeSelectedValue = activeFilter;
  }
  addFilter() {
    const activeRoute = this.router.url;
    const filteObject = {
      route: activeRoute,
      filter: this.selectedValue,
      activeFilter:
        this.selectedValue.type !== 'text'
          ? this.activeSelectedValue
          : undefined,
    };
    this.store.dispatch(setActiveFilter({ filter: filteObject }));
  }
  resetFilter(): void {
    this.selectedValue = {
      label: '',
      name: '',
      type: 'text',
    };
    this.activeSelectedValue = {
      name: '',
      value: '',
    };
    this.store.dispatch(resetActiveFilter({ routes: this.router.url }));
  }
}
