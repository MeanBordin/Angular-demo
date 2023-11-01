import { Component, Input } from '@angular/core';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss']
})
export class SearchTableComponent {
  @Input() products!: any[];
  @Input() cols!: Column[];

}

interface Column {
  field: string;
  header: string;
}
