import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  user: any;
  constructor() { }

  async ngOnInit() {
    this.user = (await Storage.get({ key: 'user' })).value;
    console.log(this.user)
  }

}
