import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Plugins } from '@capacitor/core';
import { environment } from 'src/environments/environment.prod';
import { Jobs } from '../interfaces/jobs_interface';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  url: string = environment.url;
  token: any;

  constructor(private http: HttpClient) {
    this.readerToken();
   }


  // leer token
  async readerToken() {
    if ((await Storage.get({ key: 'token' })).value) {
      const data = await Storage.get({ key: 'token' });
      const token = JSON.parse(data.value);
      this.token = token;
    } else {
      this.token = '';
    }
    return this.token;
  }



  // guardar trabajos
  save_jobs(data: Jobs){
    const headers = new HttpHeaders({
      'token': this.token['token']
    });

    return this.http.post(`${this.url}jobs/save`, data, {headers: headers});
  }


  // obtener trabajos por cliente
  getjobs_client(id: string, status:string, token: string) {

    const headers = new HttpHeaders({
      'token': token
    });

    return this.http.get<Jobs>(`${this.url}clients/jobs/${id}/${status}`, { headers: headers });
  }


  // obtener detalles del trabajo
  detail_jobs(id: string, token: string){

    const headers = new HttpHeaders({
      'token': token
    });

    return this.http.get<Jobs>(`${this.url}view/jobs/${id}`, { headers: headers });
  }
  
}
