import { Component, OnInit } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { Category } from 'src/app/interfaces/category_interface';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.page.html',
  styleUrls: ['./panel.page.scss'],
})
export class PanelPage implements OnInit {
  subscribe: any;
  categories: Category[] = [];
  constructor(public platform: Platform, public menuCtrl: MenuController, public registerService: RegisterService) {
   // quitar boton de retroceso por hadware
    this.subscribe = this.platform.backButton.subscribeWithPriority(666666, () => {
      if(this.constructor.name == "PanelPage"){
        if(window.confirm("estas seguro de que quieres salir")){
          navigator["app"].exitApp();
        }
      }
    });
   }

  ngOnInit() {
    this.getCategories();
  }

  // mostrar menu
  showMenu(){
    this.menuCtrl.toggle();
  }

  getCategories(){
    this.registerService.getCategories().subscribe(resp => {
      this.categories = resp['categories'];
    });
  }
}
