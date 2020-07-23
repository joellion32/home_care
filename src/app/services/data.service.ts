import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Profession } from '../interfaces/profession_interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url: string = environment.url;

  constructor(private http: HttpClient) { }


  // obtener los paises 
  getCountry() {
    return this.http.get('https://restcountries.eu/rest/v2/lang/es')
      .pipe(
        map(
          (resp: any[]) => {
            return resp.map(country => {
              return {
                code: country.alpha3Code,
                name: country.name,
                flag: country.flag
              }
            });
          }
        )

      ); // cierre del pipe


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



