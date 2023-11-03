import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TABLE_SEARCH } from '../../constants/table-option';
import { AdminService } from '../../services/admin.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup
  cols = TABLE_SEARCH

  products: any[] = []

  date: any
  day: any
  month: any
  year: any
  newDate: any
  updateAt: any[] = []
  createAt: any[] = []

  constructor(private fb: FormBuilder, private service: AdminService) {
    this.inintForm();
  }

  ngOnInit(): void {
    this.getQueryTable()
  }

  getQueryTable() {
    this.service.getProducts().subscribe((res: any) => {
      this.products = res.map((item: any) => {
        item.image = this.service.getProductImage(item.image);
        return item;
      });
      this.getItemDate();
    })
  }

  inintForm() {
    this.searchForm = this.fb.group({
      name: [null],
      stock: [null],
      price: [null],
      image: [null]
    });
  }

  getItemDate() {
    this.products.forEach((item) => {
      item.createdAt = this.newFormatDate(item.createdAt);
      item.updatedAt = this.newFormatDate(item.updatedAt);
    });
  }

  newFormatDate(oldDate: any) {
    let date = new Date(oldDate);
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // เดือนจะนับจาก 0
    let year = date.getFullYear();
    return day + '/' + month + '/' + year;
  }

  onSave() {
    const payload = this.searchForm.getRawValue()
    console.log(payload);
  }

  onClear() {
    this.searchForm.reset()
  }

  onClearFileSelect() {
    this.searchForm.get('image')?.reset();
  }

  onDeleteInRow(id: any) {
    this.service.deleteProduct(id).subscribe(() => {
      this.getQueryTable()
    })
  }
}
