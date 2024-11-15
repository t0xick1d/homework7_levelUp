import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionComponent } from '../../tableComponents/action/action.component';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from '../../../interface/table.interface';
import { TableService } from '../../../table/table.service';
import { NestedTreeControl } from '@angular/cdk/tree';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}
interface DataProduct {
  categories: number;
  item: Product;
}

@Component({
  selector: 'app-modal-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './modal-edit.component.html',
  styleUrl: './modal-edit.component.scss',
})
export class ModalEditComponent {
  public activeProduct!: Product;
  public dataCategories!: string;
  public selectedTabIndex!: number;
  public formEdit: FormGroup;
  treeControl = new NestedTreeControl<FoodNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource();
  constructor(
    private fb: FormBuilder,
    private tableService: TableService,
    public dialogRef: MatDialogRef<ActionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataProduct
  ) {
    console.log(data.item);
    this.formEdit = this.fb.group({
      name: [data.item.name, [Validators.required]],
      price: [data.item.price, [Validators.required, Validators.min(1)]],
    });
    this.selectedTabIndex = this.data.categories;
    this.dataCategories = this.data.item.category;
  }
  ngOnInit(): void {
    this.formEdit.valueChanges.subscribe((v) => {
      console.log(v);
    });
  }
  hasChild = (_: number, node: FoodNode) =>
    !!node.children && node.children.length > 0;
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSave(): void {
    console.log(this.formEdit);
    this.tableService
      .putData({ ...this.data.item, ...this.formEdit.value })
      .subscribe(() => {
        this.tableService.nGetData();
      });
  }
}
