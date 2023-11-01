import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductRespone } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductRespone[]> {
    return this.http.get<ProductRespone[]>('http://localhost:8080/getProducts')
  }

}
