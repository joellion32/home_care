import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfessionsService } from 'src/app/services/professions.service';
import { AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-professions',
  templateUrl: './professions.page.html',
  styleUrls: ['./professions.page.scss'],
})
export class ProfessionsPage implements OnInit {
  search_text: string = '';  
  id: any = '';
  professions: any[] = [];
  constructor(private route: ActivatedRoute, private professionService: ProfessionsService, 
  private alertController: AlertController, private nav: NavController) { }


  ngOnInit() {
   this.id = this.route.snapshot.params.id;
   this.getProfessions();
  }

  // obtener las profesiones
  getProfessions(){
    this.professionService.getProfessions(this.id).subscribe(resp => {
      if(resp['profession'].length == 0){
        this.presentAlert();
      }
      this.professions = resp['profession'];
    });
  }

  // buscar las profesiones
  search(event){
    this.search_text = event.detail.value;
  }


  // alert
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'No hay registros',
      buttons: [{
        text: 'OK',
        handler: () => this.nav.navigateForward('categories')
      }]
    });

    await alert.present();
  }

}
