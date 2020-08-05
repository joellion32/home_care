import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import {Plugins,StatusBarStyle} from '@capacitor/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AuthenticationService } from './services/authentication.service';
const { SplashScreen, StatusBar, Storage } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  user: any = '';

  constructor(
    private screenOrientation: ScreenOrientation,
    private platform: Platform,
    private auth: AuthenticationService,
    private menu: MenuController
  ) {
    this.initializeApp();
    //this.authService.Isauthenticated();
    }


  async initializeApp() {
    try {
      await SplashScreen.hide();
      await StatusBar.setStyle({ style: StatusBarStyle.Light });
      await this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      if (this.platform.is('android')) {
        StatusBar.setBackgroundColor({ color: '#ffce00' });
      } else if(this.platform.is('ios')){
        StatusBar.setBackgroundColor({ color: '#ffce00' });
      }
    } catch (err) {
      console.log('This is normal in a browser', err);
    }
  }
}
