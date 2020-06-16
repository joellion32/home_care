import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-description',
  templateUrl: './description.page.html',
  styleUrls: ['./description.page.scss'],
})
export class DescriptionPage implements OnInit {

  constructor(private nav: NavController) { }

  ngOnInit() {
  }


  sendData() {
    this.nav.navigateForward('suscription');
  }
  

}
