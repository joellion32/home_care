import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController, ModalController } from '@ionic/angular';
import { SearchEmployeeComponent } from 'src/app/components/search-employee/search-employee.component';
const { Storage } = Plugins;

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  country: any;
  provinces: any[] = [];
  id: any;
  search_method: string;
  service: string;

  data = {
    province: '',
    zip_code: '',
    description: '',
    location: ''
  }

  constructor(private dataService: DataService, private activateRoute: ActivatedRoute,
    public toastController: ToastController, public modalController: ModalController) { }

  async ngOnInit() {
    this.id = this.activateRoute.snapshot.params.id;
    const response1 = ((await Storage.get({ key: 'client_data' })).value);
    const response2 = ((await Storage.get({ key: 'search_service' })).value);

    const data1 = JSON.parse(response1);
    const data2 = JSON.parse(response2);

    this.country = data1.user.country
    this.search_method = data2.service.search_method;
    this.service = data2.service.service;

    this.get_countries(this.country)
  }

  get_countries(name: string) {
    this.dataService.getCountryName(name).subscribe(resp => {
      this.provinces = resp['country'][0].provinces;
    });
  }

  // save service in storage
  async save_storage(data: any) {
    await Storage.set({
      key: 'service',
      value: JSON.stringify({
       data: data,
      })
    });
  }

// search employee by city and save data in storage
  search_employee_city() {
    if (this.data.province == '' || this.data.description == '' || this.data.location == '') {
      this.presentToast();
    } else {

      const data = {
        service: this.service,
        description: this.data.description,
        location: this.data.location
      }

      this.save_storage(data);
      this.presentModal(this.service, this.data.province);
    }
  }

// search employee by zip_code and save data in storage
  search_employee_zip() {
    if (this.data.zip_code == '' || this.data.description == '' || this.data.location == '') {
      this.presentToast();
    } else {

      const data = {
        service: this.service,
        description: this.data.description,
        location: this.data.location
      }

      this.save_storage(data);
      this.presentModal(this.service, '', this.data.zip_code);
    }
  }

  // toast
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'El campo esta vacio',
      duration: 2000
    });
    toast.present();
  }


  // modal
  async presentModal(service: string, location: string, zip_code?: string) {
    const modal = await this.modalController.create({
      component: SearchEmployeeComponent,
      componentProps: {
        service: service,
        location: location,
        zip_code: zip_code
      }
    });
    return await modal.present();
  }
}

