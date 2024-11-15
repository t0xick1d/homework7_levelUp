import { Component, Input, OnInit } from '@angular/core';
import { ModalEditComponent } from '../../model/modal-edit/modal-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../../../interface/table.interface';
import { TableService } from '../../../table/table.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrl: './action.component.scss',
})
export class ActionComponent implements OnInit {
  @Input() item!: Product;
  constructor(public dialog: MatDialog, private tableService: TableService) {}
  ngOnInit(): void {}
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalEditComponent, {
      data: {
        categories: 0,
        item: {
          ...this.item,
        },
      },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  onClickDelete() {
    this.tableService.deleteData(this.item.id).subscribe(() => {
      this.tableService.nGetData();
    });
  }
}
