import { Injectable } from '@angular/core';
import { Client } from '../interfaces/clients_iterface';
import { Plugins } from '@capacitor/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  data: Client;
  url: string = environment.url;
  constructor(private http: HttpClient) { }


  async saveData(name: string, email: string, password: string, country: string, city: string, location: string, zip_code: number){
    this.data = {
     name: name,
     email: email,
     password: password,
     country: country,
     city: city,
     location: location,
     zip_code: zip_code 
    }

    // guardar en el local storage
    await Storage.set({
      key: 'client',
      value: JSON.stringify({
        client: this.data
      })
    });
  }

  

  // guardar cliente
  async saveClient(){
    const data = await Storage.get({ key: 'client' });
    const user = JSON.parse(data.value);
    console.log(user.client);
    return this.http.post(`${this.url}clients/register`, user.client);
  }
}
