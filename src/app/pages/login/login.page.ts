import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
const { Storage } = Plugins;
const { Network } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: String;
  loginForm: FormGroup;
  loading: any;

  data = {
    email: '',
    password: ''
  };

  constructor(
    private nav: NavController,
    public alertController: AlertController,
    private authService: AuthenticationService,
    public loadingController: LoadingController) { }

  ngOnInit() {
    this.Storage();
    this.ionViewDidLoad(false);
  }

  // loading 
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Espere por favor...',
    });
    await this.loading.present();
  }

  // comprobar estado de la aplicacion si hay conexion o no
  async ionViewDidLoad(navigation: boolean) {
    let handler = Network.addListener('networkStatusChange', (status) => {
      console.log("Network status changed", status);
    });

    let status = await Network.getStatus();
    console.log(status);

    if (status.connected == false) {
      this.presentAlert("ERROR", "No hay conexion a internet");
    } else {
      if (navigation == true) {
        this.register()
      }
    }
  }

  // navigation
  register() {
    this.nav.navigateForward('country');
  }

  async Storage() {
    this.user = (await Storage.get({ key: 'user' })).value;
  }


  // servicios 

  async login() {
    // comprobar si hay conexion
    this.ionViewDidLoad(false);


    // cargar loading
    this.presentLoading();

    // comprobar si el usuario es cliente
    if (this.user == "cliente") {
      await this.authService.loginClient(this.data.email, this.data.password).subscribe(resp => {
        this.loading.dismiss();
        this.authService.saveToken(resp['token'], resp['user']);
        this.nav.navigateForward('tabs/home');
      },
        (err: any) => {
          this.loading.dismiss();
          this.presentAlert("Alerta", "El email o la contraseña son incorrectos")
        });
    }
    // comprobar si el usuario es colaborador
    else if (this.user == "colaborador") {
      await this.authService.loginEmployee(this.data.email, this.data.password).subscribe(resp => {
        this.loading.dismiss();
        this.authService.saveToken(resp['token'], resp['user']);
        this.nav.navigateForward('tabs/panel');
      },
        (err: any) => {
          this.loading.dismiss();
          this.presentAlert("Alerta", "El email o la contraseña son incorrectos")
        });
    }
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


}
