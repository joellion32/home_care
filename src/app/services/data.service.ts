import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Profession } from '../interfaces/profession_interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url: string = environment.url;

  constructor(private http: HttpClient) { }


  // obtener los paises 
  getCountry() {
    return this.http.get(`${this.url}get/countries`);
  }

  // obtener paises por id
  getCountryId(id: string){
    return this.http.get(`${this.url}view/countries/${id}`)
  }

  // obtener paises por nombre
  getCountryName(name: string){
    return this.http.get(`${this.url}view/country/${name}`)
  }


  // obtener categorias
  getCategories() {
    return this.http.get(`${this.url}get/categories`);
  }



  // obtener las profesiones por categoria
  getProfessions(id: string) {
    return this.http.get<Profession>(`${this.url}professions/view/${id}`);
  }


  // obtener las suscripciones
  getSuscriptions() {
    return this.http.get(`${this.url}suscriptions/all`);
  }

} // cierre de la clase



