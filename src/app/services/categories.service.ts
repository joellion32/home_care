import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  url: string = environment.url;

  constructor(private http: HttpClient) { }


   getCategories(){
      return this.http.get(`${this.url}get/categories`);
  }
}
