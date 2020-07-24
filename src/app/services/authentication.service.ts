import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Plugins } from '@capacitor/core';
import { NavController } from '@ionic/angular';
const { Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url: string = environment.url;
  token: string = '';
  user: string = '';

  constructor(private http: HttpClient, private nav: NavController) {
    this.readerToken();
  }

  /*------------------------------------CLIENT--------------------------------------------------*/
  //login cliente
  loginClient(email: string, password: string) {

    const user = {
      email: email,
      password: password
    }

    return this.http.post(`${this.url}clients/login`, user);
  }


  //login colaborador
  loginEmployee(email: string, password: string) {

    const user = {
      email: email,
      password: password
    }

    return this.http.post(`${this.url}employee/login`, user);
  }

  // guardar Token
  async saveToken(token: string, user: any) {
    // guardar token 
    await Storage.set({
      key: 'token',
      value: JSON.stringify({
        token: token
      })
    });

    // guardar usuario 
    await Storage.set({
      key: 'client_data',
      value: JSON.stringify({
        user: user
      })
    });
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


  // verificar si el usuario esta auntenticado

  async Isauthenticated() {

    // token
    const data = await Storage.get({ key: 'token' });
    const token = JSON.parse(data.value);
    
    // user
    const data_user = await Storage.get({ key: 'user' });
    const user = data_user.value;
    
    if (token.token.length > 0) {
      if(user == "cliente"){
        this.nav.navigateForward('tabs/home');
      }else if(user == "colaborador"){
        this.nav.navigateForward('tabs/panel');
      }else{
        this.nav.navigateForward('tabs/login');
      }
    }
 
  }
}



