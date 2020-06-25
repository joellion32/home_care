import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-description',
  templateUrl: './description.page.html',
  styleUrls: ['./description.page.scss'],
})
export class DescriptionPage implements OnInit {
  description: string;
  constructor(private nav: NavController, private storageService: StorageService) { }

  ngOnInit() {
  }


  async sendData() {
    const data = await Storage.get({ key: 'client' });
    const user = JSON.parse(data.value);

    this.storageService.saveData(user.client.name, user.client.email,
      user.client.password, user.client.telephone, user.client.country, user.client.city,
      user.client.location, user.client.zip_code, user.client.profession, this.description)
    this.nav.navigateForward('suscription');
  }


}
