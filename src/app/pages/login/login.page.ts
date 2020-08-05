import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { NavController, AlertController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ViewLoadService } from 'src/app/services/components/view-load.service';
import { LoadingService } from 'src/app/services/components/loading.service';
const { Storage } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: String;
  loginForm: FormGroup;
  loading: any;
  dismiss: any;
  subscribe: any;

  data = {
    email: '',
    password: ''
  };

  constructor(
    private nav: NavController,
    public alertController: AlertController,
    private authService: AuthenticationService,
    private loadingService: LoadingService,
    private viewLoad: ViewLoadService) { }

  ngOnInit() {
    this.Storage();
    this.viewLoad.ionViewDidLoad(false);
  }


  async Storage() {
    this.user = (await Storage.get({ key: 'user' })).value;
  }


  async login() {
    // comprobar si hay conexion
    this.viewLoad.ionViewDidLoad(false);

    // comprobar si el usuario es cliente
    if (this.user == "cliente") {
      this.loadingService.presentLoading();
      await this.authService.loginClient(this.data.email, this.data.password).subscribe(resp => {
        this.authService.saveToken(resp['token'], resp['user']);
        this.nav.navigateForward('tabs/home');
        this.loadingService.closeLoading();
      },
        (err: any) => {
          this.loadingService.closeLoading();
          this.presentAlert("Alerta", "El email o la contraseña son incorrectos")
        });
    }
    // comprobar si el usuario es colaborador
    else if (this.user == "colaborador") {
      this.loadingService.presentLoading();
      await this.authService.loginEmployee(this.data.email, this.data.password).subscribe(resp => {
        this.authService.saveToken(resp['token'], resp['user']);
        this.nav.navigateForward('tabs/panel');
        this.loadingService.closeLoading();
      },
        (err: any) => {
          this.loadingService.closeLoading();
          this.presentAlert("Alerta", "El email o la contraseña son incorrectos")
        });
    }
  }


  // navegar a la pagina de registro
  navigate() {
    this.viewLoad.ionViewDidLoad(true, 'country');
  }


  // alerta 
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
