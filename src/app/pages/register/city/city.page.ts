import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-city',
  templateUrl: './city.page.html',
  styleUrls: ['./city.page.scss'],
})
export class CityPage implements OnInit {
  form: FormGroup;
  constructor(private nav: NavController, public formBuilder: FormBuilder, private storageService: StorageService) { }

  ngOnInit() {
    this.createForm();
  }

  // crear formulario 
  createForm(){
    this.form = this.formBuilder.group({
    city: ['', Validators.required],
    location: ['', Validators.required],
    zip_code: ['', Validators.required]
    });
  }

// recojer datos un guardarlos en el storage
 async sendData(){
  const data = await Storage.get({ key: 'client' });
  const user = JSON.parse(data.value);

  this.storageService.saveData('','', '', '', user.client.country, this.form.value.city, this.form.value.location, this.form.value.zip_code)
  this.nav.navigateForward('person-data');
  }
}
