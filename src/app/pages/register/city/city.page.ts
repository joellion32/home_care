import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { Plugins } from '@capacitor/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

const { Storage } = Plugins;

@Component({
  selector: 'app-city',
  templateUrl: './city.page.html',
  styleUrls: ['./city.page.scss'],
})
export class CityPage implements OnInit {
  form: FormGroup;
  id: any;
  provinces: any[] = [];

  constructor(private nav: NavController, public formBuilder: FormBuilder, 
    private storageService: StorageService, private activateRoute: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.createForm();
    this.id = this.activateRoute.snapshot.params.id;
    this.dataService.getCountryId(this.id).subscribe(resp => {
    this.provinces = resp['country'].provinces;
    });
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
