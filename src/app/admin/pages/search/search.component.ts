import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TABLE_SEARCH } from '../../constants/table-option';
import { AdminService } from '../../services/admin.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup;
  cols = TABLE_SEARCH;
  imagePreview!: any;
  file: any;

  products: any[] = [];

  date: any;
  day: any;
  month: any;
  year: any;
  newDate: any;
  updateAt: any[] = [];
  createAt: any[] = [];

  constructor(
    private fb: FormBuilder,
    private service: AdminService,
    private location: Location,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.inintForm();
  }

  ngOnInit(): void {
    this.getQueryTable();
  }

  getQueryTable() {
    this.service.getProducts().subscribe((res: any) => {
      this.products = res.map((item: any) => {
        item.image = this.service.getProductImage(item.image);
        return item;
      });
      this.getItemDate();
    });
  }

  inintForm() {
    this.searchForm = this.fb.group({
      name: [null],
      stock: [null],
      price: [null],
      image: [null],
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

  getFile(fileEvent: any) {
    this.file = fileEvent;
  }

  onSave(event: any) {
    const payload = this.searchForm.getRawValue();

    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('stock', payload.stock);
    formData.append('price', payload.price);
    formData.append('image', this.file);

    this.service.saveProducts(formData).subscribe((res) => {
      this.getQueryTable();
    });

    this.searchForm.reset();
    this.imagePreview = event;
  }

  editProduct(id: any) {
    this.service.productId$.next(id) 
    this.router.navigate(['admin/save'])
  }

  onClear(event: any) {
    this.searchForm.reset();
    this.imagePreview = event;
  }

  onClearFileSelect() {
    this.searchForm.get('image')?.reset();
  }

  onDeleteInRow(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ตกลง',
      confirmButtonColor: '#FF7272',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        this.service.deleteProduct(id).subscribe(() => {
          this.getQueryTable();
        });
      }
    });
  }
}
