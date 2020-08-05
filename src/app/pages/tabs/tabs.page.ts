import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Platform, IonRouterOutlet } from '@ionic/angular';

const { Storage, App } = Plugins;

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  user: any;
  constructor(private platform: Platform, private routerOutlet: IonRouterOutlet) { 
    this.exitApp();
  }

  async ngOnInit() {
    this.user = (await Storage.get({ key: 'user' })).value;
    console.log(this.user)
  }


   // salir de la aplicacion
   exitApp() {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
  }
}
