import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Plugins } from '@capacitor/core';
import { StorageService } from 'src/app/services/storage.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';

const { Storage } = Plugins;

@Component({
  selector: 'app-suscription',
  templateUrl: './suscription.page.html',
  styleUrls: ['./suscription.page.scss'],
})
export class SuscriptionPage implements OnInit {
  suscriptions: any[] = [];
  loading: any;
  id: string;

  constructor(private dataService: DataService, 
    private storageService: StorageService, private nav: NavController, 
    private loadingController: LoadingController, private alertController: AlertController) { }

  ngOnInit() {
    this.dataService.getSuscriptions().subscribe(resp => {
      this.suscriptions = resp['suscription']
    })
    
  }

  async sendData(id: string){
    const data = await Storage.get({ key: 'client' });
    const user = JSON.parse(data.value);
  
    this.storageService.saveData(user.client.name, user.client.email,
      user.client.password, user.client.telephone, user.client.country, user.client.city,
      user.client.location, user.client.zip_code, user.client.profession, user.client.description, id);

      this.presentLoading('Espere...');
      // enviar datos al servicio y guardarlos en el servidor
      (await this.storageService.saveEmployee()).subscribe(resp =>{
        console.log(resp);

        // guardar el id del usuario
        Storage.set({
          key: '_id',
          value: JSON.stringify({
            _id: resp['user']._id
          })
        });

        this.loading.dismiss();
        
        // navegar hacia la pantalla de fotos
        this.nav.navigateForward('photo');
      }, (err) => {
          this.loading.dismiss();
          this.presentAlert();
      });
  }


  // loading
  async presentLoading(message: string) {
    this.loading = await this.loadingController.create({
      message: message,
      backdropDismiss: false,
    });
    return this.loading.present();

  }

  // alertas

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'ERROR',
      message: 'Ha ocurrido un error',
      buttons: ['CONTINUAR']
    });

    await alert.present();
  }


}
