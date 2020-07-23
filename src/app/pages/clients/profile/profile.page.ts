import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { User } from 'src/app/interfaces/user_iterface';
const { Storage } = Plugins;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
@ViewChild(IonSegment) segment: IonSegment;

value: any = 'profile';

user: any = {
name: '',
email: '',
country: '',
city: ''
};

  constructor() { }

  ngOnInit() {
   this.LoadUser();
  }


 // cambiar segment
  segmentChanged(event){
    this.value = event.detail.value;
  }


  // cargar usuario del storage
  async LoadUser(){
    const ret = await Storage.get({ key: 'client_data' });
    const user = JSON.parse(ret.value);
    this.user = user.user;
  }
}
