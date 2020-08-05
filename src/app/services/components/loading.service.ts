import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
loading: any;

  constructor(public loadingController: LoadingController) { }


  async presentLoading() {
    this.loading = await this.loadingController.create({
      spinner: 'dots'
    });
      return this.loading.present();
  }

  closeLoading(){
    return this.loading.dismiss();
  }
}
