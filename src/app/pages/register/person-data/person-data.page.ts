import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { NavController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
const { Storage } = Plugins;

@Component({
  selector: 'app-person-data',
  templateUrl: './person-data.page.html',
  styleUrls: ['./person-data.page.scss'],
})
export class PersonDataPage implements OnInit {
  user: String;
  form: FormGroup;
  loading: boolean = true;
  constructor(private nav: NavController, public formBuilder: FormBuilder, 
    private storageService: StorageService, public loadingController: LoadingController) { }

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
      password1: ['', Validators.required],
      password2: ['', Validators.required]
    }, { validators: this.validatePassword('password1', 'password2') });
  }


  async navigate() {
    const data = await Storage.get({ key: 'client' });
    const user = JSON.parse(data.value);

    if (this.user == "cliente") {
      // guardar en el storage
      this.storageService.saveData(this.form.value.name, this.form.value.email,
        this.form.value.password1, user.client.country, user.client.city,
        user.client.location, user.client.zip_code);

      //  ejecutar loading
       this.presentLoading();


      // enviar al servicio y guardar en el servidor
      (await this.storageService.saveClient()).subscribe(resp => {
        console.log(resp);
      })
    }

    else if (this.user == "colaborador") {
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
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      backdropDismiss: false,
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }


}
