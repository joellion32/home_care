import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { StorageService } from 'src/app/services/storage.service';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-professions',
  templateUrl: './professions.page.html',
  styleUrls: ['./professions.page.scss'],
})
export class ProfessionsPage implements OnInit {
  search_text: string = '';
  id: any = '';

  professions: any[] = [];
  items: any[] = [];
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private dataService: DataService,
    private alertController: AlertController, private nav: NavController, private storageService: StorageService) { }


  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.getProfessions();
  }

  // obtener las profesiones
  getProfessions() {
    this.dataService.getProfessions(this.id).subscribe(resp => {
      if (resp['profession'].length == 0) {
        this.errorAlert("No hay registros", "categories");
      }
      this.professions = resp['profession'];
      this.loading = false;
      console.log(this.professions);
    });
  }

  // buscar las profesiones
  search(event) {
    this.search_text = event.detail.value;
  }


  // seleccionar profesiones 
  selectProfessions(checkbox: boolean, item: string) {
    if (checkbox == true) {
      this.items.push(item);

      if (this.items.length >= 3) {
        this.presentAlert("AVISO", "Solo puede seleccionar 3 professiones", "CANCELAR");
      }

    } else {
      this.removeProfessions(this.items, item);
    }
  }


  // eliminar tag profesiones
  removeProfessions(arr, item) {
    let i = arr.indexOf(item);
    if (i !== -1) {
      arr.splice(i, 1);
    }
  }

  // enviar la data y guardarla en el storage y redireccionar a la otra pagina
  async sendData() {
     if(this.items.length == 0){
        this.presentAlert("AVISO", "Debes seleccionar al menos 1 profesión", "CANCELAR");
     }else{
      const data = await Storage.get({ key: 'client' });
      const user = JSON.parse(data.value);

      this.storageService.saveData(user.client.name, user.client.email,
        user.client.password, user.client.telephone, user.client.country, user.client.city,
        user.client.location, user.client.zip_code, this.items)
      this.nav.navigateForward('description');
     }
  }


  // alerta
  async presentAlert(header: string, message: string, button: string) {
    const alert = await this.alertController.create({
      header: header,
      backdropDismiss: false,
      message: message,
      buttons: [
        {
          text: 'CONTINUAR',
          handler: () => this.sendData()
        },
        {
          text: button,
          handler: () => console.log('cancelar')
        }
      ]
    });

    await alert.present();
  }


  // alerta de error 
  async errorAlert(message, route) {
    const alert = await this.alertController.create({
      header: "ERROR",
      backdropDismiss: false,
      message: message,
      buttons: [
        {
          text: 'CONTINUAR',
          handler: () => this.nav.navigateForward(route)
        }]
    });

    await alert.present();
  }
}
