import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TABLE_SEARCH } from '../../constants/table-option';
import { AdminService } from '../../services/admin.service';

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
  updateAt: any
  createAt: any

  constructor(private fb: FormBuilder, private service: AdminService) {
    this.service.testGetAll().subscribe(res => {
      this.products = res
      this.getItemDate()
      const newCreatedAt = this.newFormatDate(this.createAt)
      const newUpdatedAt = this.newFormatDate(this.updateAt)
      this.products.forEach((item) => {
        item.createdAt = newCreatedAt
        item.updatedAt = newUpdatedAt
      })
    })

  }

  ngOnInit(): void {
    this.inintForm();
  }

  inintForm() {
    this.searchForm = this.fb.group({
      productname: [null],
      created: [null],
      updated: [null]
    });
  }

  getItemDate() {
    this.products.forEach((item: any) => {
      this.updateAt = item.createdAt
      this.createAt = item.updatedAt
    })
  }

  newFormatDate(oldDate: any) {
    let date = new Date(oldDate);
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // เดือนจะนับจาก 0
    let year = date.getFullYear();
    return day + '/' + month + '/' + year;
  }

  onSearch() {
    const payload = this.searchForm.getRawValue()
    console.log(payload);
  }

  onClear() {
    this.searchForm.reset()
  }
}
