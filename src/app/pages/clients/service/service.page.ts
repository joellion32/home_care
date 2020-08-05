import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Profession } from 'src/app/interfaces/profession_interface';
import { Plugins } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
const { Storage } = Plugins;

@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {
  id: string;
  loading: boolean = true;
  professions: Profession;
  category: string;

  constructor(private activateRoute: ActivatedRoute, private dataService: DataService, 
    private router: Router, public alertController: AlertController) { }

  async ngOnInit() {
    this.id = this.activateRoute.snapshot.params.id;
    this.category = ((await Storage.get({ key: 'category' })).value);
    this.loadData(this.id);

  }

  //cargar data
  loadData(id) {
    this.dataService.getProfessions(id).subscribe(resp => {
      this.loading = false;
      this.professions = resp['profession'];
    });
  }


  // guardar en el storage
  async saveStorage(data: object){
    await Storage.set({
      key: 'search_service',
      value: JSON.stringify({
      service: data
      })
    });
  }

  // navegar a la pagina de buscar
  navigate(service: string){
    this.presentAlertConfirm(service);
  }


  // alerta 
  async presentAlertConfirm(service: string) {
    const alert = await this.alertController.create({
      message: '<strong>Seleccione tipo de busqueda</strong>',
      buttons: [
        {
          text: 'Ciudad',
          cssClass: 'secondary',
          handler: () => {
            const data = {
              service: service,
              search_method: 'ciudad'
            }

            this.saveStorage(data);
            this.router.navigateByUrl('search');
          }
        }, {
          text: 'Codigo Postal',
          cssClass: 'secondary',
          handler: () => {
            const data = {
              service: service,
              search_method: 'codigo'
            }

            this.saveStorage(data);
            this.router.navigateByUrl('search');
          }
        }
      ]
    });

    await alert.present();
  }

}
