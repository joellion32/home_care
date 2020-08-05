import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
const { Storage } = Plugins;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  user: any = '';
  constructor(private auth: AuthenticationService) { }

 async ngOnInit() {
    this.user = (await Storage.get({ key: 'user' })).value;
  }


  logout(){
    this.auth.logout();
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
