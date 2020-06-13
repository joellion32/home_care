import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfessionsService {
  url: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  // get professions for category
  getProfessions(id: string){
    console.log(id);
    return this.http.get(`${this.url}professions/view/${id}`);
  }

}
