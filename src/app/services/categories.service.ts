import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../interfaces/category_interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  url: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }


   getCategories(){
      return this.http.get(`${this.url}get/categories`);
  }
}
