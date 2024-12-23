import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameComponent } from '../component/tableComponents/name/name.component';
import { SkuComponent } from '../component/tableComponents/sku/sku.component';
import { PriceComponent } from '../component/tableComponents/price/price.component';
import { CountryComponent } from '../component/tableComponents/country/country.component';
import { TagsComponent } from '../component/tableComponents/tags/tags.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ActionComponent } from '../component/tableComponents/action/action.component';
import { FilterComponent } from './filter/filter.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NameComponent,
    SkuComponent,
    PriceComponent,
    CountryComponent,
    TagsComponent,
    ActionComponent,
    FilterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatChipsModule,
    MatMenuModule,
    MatButtonModule,
  ],
  exports: [
    NameComponent,
    SkuComponent,
    PriceComponent,
    CountryComponent,
    TagsComponent,
    ActionComponent,
    FilterComponent,
  ],
})
export class TableModule {}
