import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
const { Storage } = Plugins;

@Component({
  selector: 'app-person-data',
  templateUrl: './person-data.page.html',
  styleUrls: ['./person-data.page.scss'],
})
export class PersonDataPage implements OnInit {
  user: String;
  form: FormGroup;
  loading: any;

  constructor(private nav: NavController, public formBuilder: FormBuilder, 
    private storageService: StorageService, public loadingController: LoadingController,
    private auth: AuthenticationService,  public alertController: AlertController) { }

  ngOnInit() {
    this.Storage();
    this.createForm();
  }

  async Storage() {
    this.user = (await Storage.get({ key: 'user' })).value;
  }


  // crear formulario 
  createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      telephone: [''],
      password1: ['', Validators.required],
      password2: ['', Validators.required]
    }, { validators: this.validatePassword('password1', 'password2') });
  }

// navegar hasta la siguiente pagina
  async navigate() {
    const data = await Storage.get({ key: 'client' });
    const user = JSON.parse(data.value);

    if (this.user == "cliente") {
      // guardar en el storage
      this.storageService.saveData(this.form.value.name, this.form.value.email,
        this.form.value.password1, '', user.client.country, user.client.city,
        user.client.location, user.client.zip_code);

      //  ejecutar loading
      this.presentLoading('Espere...');

      // enviar al servicio y guardar en el servidor
      (await this.storageService.saveClient()).subscribe(resp => {
        console.log(resp);
        this.loading.dismiss();

        // loguear
        this.auth.loginClient(this.form.value.email, this.form.value.password1).subscribe(resp => {
          console.log(resp);
          this.loading.dismiss();
          this.auth.saveToken(resp['token'], resp['user']);
          this.nav.navigateForward('tabs/home');
        });
      }, (err: any) => {
        this.loading.dismiss();
        this.presentAlert("Alerta", "El correo electronico ya existe")
      });
    }

    // si el usuario es colaborador
    else if (this.user == "colaborador") {
    this.storageService.saveData(this.form.value.name, this.form.value.email,
    this.form.value.password1, this.form.value.telephone, user.client.country, user.client.city,
    user.client.location, user.client.zip_code);

      this.nav.navigateForward('categories');
    }
  }

  // validar contraseña
  validatePassword(password1Name: string, password2Name: string) {
    return (formGroup: FormGroup) => {
      const password1 = formGroup.controls[password1Name]
      const password2 = formGroup.controls[password2Name]

      // validar si son iguales
      if (password1.value === password2.value) {
        password1.setErrors(null);
      } else {
        password2.setErrors({ noEsigual: true });
      }

    }
  }

  // loading
  async presentLoading(message: string) {
    this.loading = await this.loadingController.create({
      message: message,
      backdropDismiss: false,
    });
    return this.loading.present();

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
