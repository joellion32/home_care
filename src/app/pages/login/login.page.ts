import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { NavController, AlertController } from '@ionic/angular';
const { Storage } = Plugins;
const { Network } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: String;
  constructor(private nav: NavController, public alertController: AlertController) { }

   ngOnInit() {
   this.Storage();
   this.ionViewDidLoad(false);
  }

  // comprobar estado de la aplicacion si hay conexion o no
  async ionViewDidLoad(navigation: boolean){
    let handler = Network.addListener('networkStatusChange', (status) => {
      console.log("Network status changed", status);
    });

    let status = await Network.getStatus();
    console.log(status);

    if(status.connected == false){
      this.presentAlert("ERROR", "No hay conexion a internet");
    }else{
      if(navigation == true){
        this.register()
      }else{
        this.login();
      }
    }
  }

  // navigation
  register(){
    this.nav.navigateForward('country');
  }

  async Storage(){
    this.user = (await Storage.get({key: 'user'})).value;
  }


  // alerta 
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }


  // servicios 

  async login(){
    console.log('CORRECTO');
  }

}
