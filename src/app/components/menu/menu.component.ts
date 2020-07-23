import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  user: any = '';
  constructor(private nav: NavController) { }

 async ngOnInit() {
    this.user = (await Storage.get({ key: 'user' })).value;
  }

  navigate(route: any){
    this.removeItem();
    this.nav.navigateForward(route);
  }


  // delete data
async removeItem() {
  const user = (await Storage.get({ key: 'user' })).value;

  if(user == 'cliente'){
    await Storage.remove({ key: 'token' });
    await Storage.remove({ key: 'client_data' });
  }else{
    console.log('cerrar sesion')
  }
}
}
