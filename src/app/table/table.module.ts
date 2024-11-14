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

@NgModule({
  declarations: [
    NameComponent,
    SkuComponent,
    PriceComponent,
    CountryComponent,
    TagsComponent,
    ActionComponent,
  ],
  imports: [
    CommonModule,
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
  ],
})
export class TableModule {}
