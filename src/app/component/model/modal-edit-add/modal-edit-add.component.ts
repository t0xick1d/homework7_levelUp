import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TableComponent } from '../../../table/table.component';
import { TableService } from '../../../table/table.service';
import { newProduct } from '../../../interface/table.interface';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-edit-add',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  templateUrl: './modal-edit-add.component.html',
  styleUrl: './modal-edit-add.component.scss',
})
export class ModalEditAddComponent implements OnInit {
  public data: newProduct = {
    name: '',
    price: 0,
    discount: 0,
    sku: '',
    isActive: true,
    countryCode: '',
    itemUrl: '',
    tags: [],
  };
  constructor(
    public dialogRef: MatDialogRef<TableComponent>,
    private tableService: TableService
  ) {}

  ngOnInit(): void {}
  onSave(): void {
    this.tableService.postData(this.data).subscribe(() => {
      this.tableService.nGetData();
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
