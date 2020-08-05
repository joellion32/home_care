import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { User } from '../interfaces/user_iterface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url: string = environment.url;

  constructor(private http: HttpClient) { }

  // ver colaborador por ciudad o provincia
  get_employees_city(service: string, location: string){
    return this.http.get<User>(`${this.url}search_c/employee/${service}/${location}`)
  }

  // ver colaborador por codigo postal
  get_employees_zip(service: string, zip_code: string){
    return this.http.get<User>(`${this.url}search_z/employee/${service}/${zip_code}`)
  }

  // ver colaborador por id
  get_employee_id(id: string){
    return this.http.get<User>(`${this.url}employee/view/${id}`)
  }

}
