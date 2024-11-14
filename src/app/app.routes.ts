import { Routes } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TableComponent } from './table/table.component';

export const routes: Routes = [
  {
    path: '',
    component: SideBarComponent,
    children: [
      {
        path: 'storeA',
        component: TableComponent,
      },
      {
        path: 'storeB',
        component: TableComponent,
      },
      {
        path: 'storeC',
        component: TableComponent,
      },
    ],
  },
];
