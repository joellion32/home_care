import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProfessionsService {
  url: string = environment.url;

  constructor(private http: HttpClient) { }

  // get professions for category
  getProfessions(id: string){
    console.log(id);
    return this.http.get(`${this.url}professions/view/${id}`);
  }

}
