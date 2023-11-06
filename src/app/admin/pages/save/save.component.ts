import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit {
  saveForm!: FormGroup;
  imagePreview!: any;
  file: any;

  id: any

  setData!: any

  products: any[] = [];

  constructor(
    private fb: FormBuilder,
    private service: AdminService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.inintForm();
    this.getQueryTable();
  }

  ngOnInit(): void {
    this.onDisable()
  }

  getQueryTable() {
    this.id = this.service.productId$.value

    this.service.getProductsForPrm(this.id).subscribe((res: any) => {
      this.imagePreview = this.service.getProductImage(res['image'])
      
      this.setData = {
        id: res.id,
        name: res.name,
        stock: res.stock,
        price: res.price,
        createdAt: res.createdAt,
        updatedAt: res.updatedAt,
      };

      // patch ค่าที่ไม่รวมรูปภาพ
      this.saveForm.patchValue(this.setData);
    });
  }

  inintForm() {
    this.saveForm = this.fb.group({
      name: [null],
      stock: [null],
      price: [null],
      image: [null],
      updatedAt: [null],
      createdAt: [null],
    });
  }

  onDisable() {
    this.saveForm.get('updatedAt')?.disable()
    this.saveForm.get('createdAt')?.disable()
  }

  getFile(fileEvent: any) {
    this.file = fileEvent;
  }


  onUpdate() {
    const payload = this.saveForm.getRawValue();
    this.id = this.service.productId$.value

    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('stock', payload.stock);
    formData.append('price', payload.price);
    formData.append('image', this.file);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, edit it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Edit Success!",
          text: "Your data has been updated.",
          icon: "success"
        });
        this.service.updateProductPms(this.id, formData).subscribe((res: any) => {
          this.router.navigate(['admin'])
        })
      }
    });
  }

  onBackPage(){
    this.router.navigate(['admin'])
  }

}
