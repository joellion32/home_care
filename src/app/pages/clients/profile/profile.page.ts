import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { User } from 'src/app/interfaces/user_iterface';
import { AuthenticationService } from 'src/app/services/authentication.service';
const { Storage } = Plugins;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {


user: any = {}


  constructor(private auth: AuthenticationService) { }

  async ngOnInit() {
   this.LoadUser();
  }


  // cargar usuario del storage
  async LoadUser(){
    const ret = await Storage.get({ key: 'client_data' });
    const user = JSON.parse(ret.value);
    this.user = user.user;
  }

  logout(){
    this.auth.logout();
  }

}
