import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-city',
  templateUrl: './city.page.html',
  styleUrls: ['./city.page.scss'],
})
export class CityPage implements OnInit {

  constructor(private nav: NavController) { }

  ngOnInit() {
  }

  person_data(){
    this.nav.navigateForward('person-data');
  }
}
