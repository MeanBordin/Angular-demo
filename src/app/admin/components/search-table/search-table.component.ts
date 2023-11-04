import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss']
})
export class SearchTableComponent {
  @Input() products!: any[];
  @Input() cols!: Column[];

  @Output() deleteInRowEvent = new EventEmitter();
  @Output() editProductEvent = new EventEmitter();

  constructor() {
    // TODO
  }

  onDeleteInRow(id: any) {
    this.deleteInRowEvent.emit(id);
  }

  editProduct(id: any) {
    this.editProductEvent.emit(id);
  }
}

interface Column {
  field: string;
  header: string;
}
