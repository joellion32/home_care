import { Injectable } from '@angular/core'
import { Plugins } from '@capacitor/core';
import { NavController, AlertController } from '@ionic/angular';
const { Network } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ViewLoadService {

  constructor(private nav: NavController, public alertController: AlertController) { }

    // comprobar estado de la aplicacion si hay conexion o no
    async ionViewDidLoad(navigation: boolean, route?: any) {
      Network.addListener('networkStatusChange', (status) => {
        console.log("Network status changed", status);
      });
  
      let status = await Network.getStatus();
      console.log(status);
  
      if (status.connected == false) {
        this.presentAlert("ERROR", "No hay conexion a internet");
      } else {
        if (navigation == true) {
          this.nav.navigateForward(route);
        }
      }
    }

    // alerta 
     // alerta 
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
