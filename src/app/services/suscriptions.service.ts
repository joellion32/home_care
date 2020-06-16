import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SuscriptionsService {
  url: string = environment.url;
  constructor(private http: HttpClient) { }


  // obtener las suscripciones
  getSuscriptions(){
    return this.http.get(`${this.url}suscriptions/all`);
  }
}
