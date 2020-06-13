import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { NavController } from '@ionic/angular';
const { Storage } = Plugins;

@Component({
  selector: 'app-person-data',
  templateUrl: './person-data.page.html',
  styleUrls: ['./person-data.page.scss'],
})
export class PersonDataPage implements OnInit {
 user: String;
  constructor(private nav: NavController) {}

  ngOnInit() {
    this.Storage();
  }

  async Storage(){
    this.user = (await Storage.get({key: 'user'})).value;
  }


  navigate(){
    if(this.user == "cliente"){
      console.log('ejecutar servicio')
    }

    else if(this.user == "colaborador"){
      this.nav.navigateForward('categories');
    }
  }
  

}
