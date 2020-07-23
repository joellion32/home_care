import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import {Plugins,StatusBarStyle} from '@capacitor/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private screenOrientation: ScreenOrientation,
    private platform: Platform,
    private authService: AuthenticationService
  ) {
    this.initializeApp();
    this.authService.Isauthenticated();
  }

  async initializeApp() {
    const { SplashScreen, StatusBar } = Plugins;
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
