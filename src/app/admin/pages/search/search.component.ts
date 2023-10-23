import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { last } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  searchForm!: FormGroup
  cols = [
    { field: 'code', header: 'Code' },
    { field: 'name', header: 'Name' },
    { field: 'category', header: 'Category' },
    { field: 'quantity', header: 'Quantity' }
  ]

  products = [
    { code: 'code', name: 'Code', category: 10, quantity: 10},
    { code: 'code', name: 'Code', category: 10, quantity: 10},
    { code: 'code', name: 'Code', category: 10, quantity: 10},
  ]


  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.inintForm();
  }

  inintForm() {
    this.searchForm = this.fb.group({
      username: [null],
      password: [null]
    });
  }

  onSearch() {
    const payload = this.searchForm.getRawValue()
    console.log(payload);
  }
}
